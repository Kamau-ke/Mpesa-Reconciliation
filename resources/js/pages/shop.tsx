import NavBar from '@/components/nav-bar';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type TransactionStatus =
    | 'Matched'
    | 'Pending'
    | 'Unmatched'
    | 'Failed';

type Transaction = {
    id: number;
    mpesa_receipt_number: string;
    mpesaReceipt: string;
    phone_number: string;
    sender_name: string;
    amount: number;
    status: TransactionStatus;
    time: string;
    shop_name: string;
    till_number: string;
};

type Shop = {
    id: number;
    name: string;
    till_number: string;
    location: string;
    phone: string;
};

type AuthUser = {
    id: number;
    name: string;
    email: string;
};

type PageProps = {
    auth: {
        user: AuthUser;
    };
};

interface ShopProps {
    shop: Shop;
    shops: Shop[];
    activeShopId: number;
    latestTransactions: Transaction[];
    sumOfAllTransactions: number;
    sumOfTodayTransactions: number;
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function formatKES(amount: number) {
    return `KES ${amount.toLocaleString('en-KE')}`;
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function handleLogout() {
    router.post('/logout');
}



export default function Shop({
    shop,
    shops,
    activeShopId,
    latestTransactions,
    sumOfAllTransactions,
    sumOfTodayTransactions,
}: ShopProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title={`${shop.name} — Shop`} />

            <div className="min-h-screen bg-[#101010] text-[#F5F5F5] [font-family:'Inter',ui-sans-serif,sans-serif]">
                <div className="flex min-h-screen">

                    {/* ======================================================
                        SIDEBAR
                    ====================================================== */}

                    <aside className="hidden w-64 shrink-0 border-r border-[#353538] bg-[#1B1B1D] lg:flex lg:flex-col">

                        {/* Logo */}
                        <div className="px-6 pb-8 pt-7">
                            <div
                                className="text-2xl font-bold tracking-tight text-[#F5F5F5]"
                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                            >
                                kadogo
                            </div>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A7A7AB]">
                                M-Pesa Reconciliation
                            </p>
                        </div>

                        {/* Navigation */}
                       <NavBar shops={shops} activeShopId={activeShopId}/>

                        {/* Owner */}
                        <OwnerMenu auth={auth} />

                    </aside>

                    {/* ======================================================
                        MAIN
                    ====================================================== */}

                    <main className="min-w-0 flex-1">

                        {/* Header */}
                        <header className="border-b border-[#353538] bg-[#1B1B1D] px-5 py-5 sm:px-6 lg:px-10">

                            <div className="flex items-center justify-between gap-5">

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-semibold text-[#A7A7AB]">
                                        Shop
                                    </p>

                                    <h1
                                        className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl"
                                        style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                    >
                                        {shop.name}
                                    </h1>

                                    <p className="mt-1 hidden text-sm text-[#A7A7AB] sm:block">
                                        M-Pesa reconciliation overview for this shop.
                                    </p>

                                </div>

                                <div className="hidden text-right sm:block">

                                    <p className="text-sm font-semibold text-[#F5F5F5]">
                                        Till {shop.till_number}
                                    </p>

                                    <p className="mt-1 text-xs text-[#A7A7AB]">
                                        {shop.location}
                                    </p>

                                </div>

                            </div>

                        </header>

                        {/* Content */}
                        <div className="p-5 sm:p-6 lg:p-10">

                            <section>

                                <div className="mb-5">
                                    <h2
                                        className="text-base font-bold text-[#F5F5F5]"
                                        style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                    >
                                        Today's overview
                                    </h2>

                                    <p className="mt-1 text-xs text-[#A7A7AB]">
                                        Collections for {shop.name}.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">

                                    <StatCard
                                        label="Today's Collections"
                                        value={formatKES(sumOfTodayTransactions)}
                                        description="Total M-Pesa received today"
                                        accent="green"
                                    />

                                    <StatCard
                                        label="Total Collections"
                                        value={formatKES(sumOfAllTransactions)}
                                        description="All-time M-Pesa received"
                                        accent="green"
                                    />

                                </div>

                            </section>

                            {/* ==================================================
                                TRANSACTIONS
                            ================================================== */}

                            <div className="mt-8">

                                <section className="min-w-0 overflow-hidden rounded-2xl border border-[#353538] bg-[#1B1B1D]">

                                    <div className="flex items-center justify-between gap-4 border-b border-[#353538] px-5 py-5">

                                        <div>
                                            <h2
                                                className="font-bold text-[#F5F5F5]"
                                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                            >
                                                Recent Transactions
                                            </h2>

                                            <p className="mt-1 text-xs text-[#A7A7AB]">
                                                Latest M-Pesa activity for {shop.name}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/owner/shop/${shop.id}/transactions`}
                                            className="shrink-0 text-sm font-bold text-[#43B47E] hover:text-[#57C68E]"
                                        >
                                            View all
                                        </Link>

                                    </div>

                                    {/* Table header */}
                                    <div className="hidden grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.8fr] border-b border-[#353538] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB] md:grid">

                                        <span>Reference</span>
                                        <span>Customer</span>
                                        <span>Till</span>
                                        <span>Amount</span>
                                        <span>Status</span>

                                    </div>

                                    {/* Rows */}
                                    <div className="divide-y divide-[#353538]">
                                        {latestTransactions.length === 0 && (
                                            <p className="px-5 py-6 text-sm text-[#A7A7AB]">
                                                No transactions yet for this shop.
                                            </p>
                                        )}

                                        {latestTransactions.map((transaction) => (
                                            <TransactionRow
                                                key={transaction.id}
                                                transaction={transaction}
                                            />
                                        ))}

                                    </div>

                                </section>

                            </div>

                            {/* ==================================================
                                SHOP PROFILE
                            ================================================== */}

                            <div className="mt-6">

                                <section className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h2
                                                className="font-bold text-[#F5F5F5]"
                                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                            >
                                                Shop profile
                                            </h2>

                                            <p className="mt-1 text-xs text-[#A7A7AB]">
                                                Business information
                                            </p>
                                        </div>

                                        <Link
                                            href={`/owner/shop/${shop.id}/edit`}
                                            className="text-sm font-bold text-[#43B47E] hover:text-[#57C68E]"
                                        >
                                            Manage
                                        </Link>

                                    </div>

                                    <div className="mt-6 grid gap-5 sm:grid-cols-2">

                                        <InfoItem
                                            label="Business"
                                            value={shop.name}
                                        />

                                        <InfoItem
                                            label="Till"
                                            value={shop.till_number}
                                        />

                                        <InfoItem
                                            label="Location"
                                            value={shop.location}
                                        />

                                        <InfoItem
                                            label="Phone"
                                            value={shop.phone}
                                        />

                                    </div>

                                </section>

                            </div>

                        </div>

                    </main>

                </div>
            </div>
        </>
    );
}

/*
|--------------------------------------------------------------------------
| Navigation Item
|--------------------------------------------------------------------------
*/

type NavItemProps = {
    label: string;
    href: string;
    active?: boolean;
};

function NavItem({
    label,
    href,
    active = false,
}: NavItemProps) {
    return (
        <Link
            href={href}
            className={[
                'mb-1 block rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                active
                    ? 'bg-[#43B47E] text-[#101010]'
                    : 'text-[#F5F5F5] hover:bg-[#242426]',
            ].join(' ')}
        >
            {label}
        </Link>
    );
}

/*
|--------------------------------------------------------------------------
| Shop Nav Dropdown
|--------------------------------------------------------------------------
*/

type ShopNavDropdownProps = {
    shops: Shop[];
    activeShopId: number;
};

function ShopNavDropdown({ shops, activeShopId }: ShopNavDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative mb-1">

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={[
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                    open
                        ? 'bg-[#242426] text-[#F5F5F5]'
                        : 'text-[#F5F5F5] hover:bg-[#242426]',
                ].join(' ')}
            >
                <span>Shops</span>

                <span
                    className={`text-xs text-[#A7A7AB] transition-transform ${open ? 'rotate-180' : ''}`}
                >
                    ▾
                </span>
            </button>

            {open && (
                <div className="mt-1 space-y-0.5 pl-2">

                    {shops.length === 0 && (
                        <p className="px-3 py-2 text-xs text-[#A7A7AB]">
                            No shops yet
                        </p>
                    )}

                    {shops.map((shop) => (
                        <Link
                            key={shop.id}
                            href={`/owner/shop/${shop.id}`}
                            className={[
                                'block rounded-lg px-3 py-2 text-sm transition',
                                shop.id === activeShopId
                                    ? 'bg-[#43B47E]/15 text-[#5FD69B]'
                                    : 'text-[#A7A7AB] hover:bg-[#242426] hover:text-[#F5F5F5]',
                            ].join(' ')}
                            onClick={() => setOpen(false)}
                        >
                            {shop.name}
                        </Link>
                    ))}

                </div>
            )}

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Owner Menu (profile trigger + dropdown)
|--------------------------------------------------------------------------
*/

type OwnerMenuProps = {
    auth: PageProps['auth'];
};

function OwnerMenu({ auth }: OwnerMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={menuRef}
            className="relative border-t border-[#353538] p-5"
        >

            {/* Dropdown */}
            {open && (
                <div className="absolute bottom-full left-5 right-5 mb-2 overflow-hidden rounded-xl border border-[#353538] bg-[#242426] shadow-lg">

                    <Link
                        href="/owner/profile"
                        className="block px-4 py-3 text-sm font-semibold text-[#F5F5F5] hover:bg-[#2A2A2D]"
                        onClick={() => setOpen(false)}
                    >
                        View profile
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-3 text-left text-sm font-semibold text-[#FF6B6B] hover:bg-[#2A2A2D]"
                    >
                        Logout
                    </button>

                </div>
            )}

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left transition hover:bg-[#242426]"
            >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#43B47E] text-sm font-bold text-[#101010]">
                    {getInitials(auth.user.name)}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#F5F5F5]">
                        {auth.user.name}
                    </p>

                    <p className="text-xs text-[#A7A7AB]">
                        {auth.user.email}
                    </p>
                </div>

                <span className="shrink-0 text-[#A7A7AB]">
                    ⋮
                </span>

            </button>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

type StatCardProps = {
    label: string;
    value: string;
    description: string;
    accent: 'green' | 'yellow' | 'red';
};

function StatCard({
    label,
    value,
    description,
    accent,
}: StatCardProps) {

    const accentStyles = {
        green: 'bg-[#43B47E]',
        yellow: 'bg-[#F2B84B]',
        red: 'bg-[#FF6B6B]',
    };

    return (
        <div className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">

            <div className="flex items-center justify-between gap-3">

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB]">
                    {label}
                </p>

                <span
                    className={`h-2 w-2 rounded-full ${accentStyles[accent]}`}
                />

            </div>

            <p className="mt-4 font-mono text-2xl font-bold tracking-tight text-[#F5F5F5]">
                {value}
            </p>

            <p className="mt-2 text-xs text-[#A7A7AB]">
                {description}
            </p>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Transaction Row
|--------------------------------------------------------------------------
*/

type TransactionRowProps = {
    transaction: Transaction;
};

function TransactionRow({
    transaction,
}: TransactionRowProps) {

    const statusClass = {
        Matched: 'bg-[#43B47E]/15 text-[#5FD69B]',
        Pending: 'bg-[#F2B84B]/15 text-[#F2B84B]',
        Unmatched: 'bg-[#FF6B6B]/15 text-[#FF6B6B]',
        Failed: 'bg-[#FF6B6B]/15 text-[#FF6B6B]',
    }[transaction.status];

    return (
        <div className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.8fr] md:items-center">

            <div>
                <p className="font-mono text-sm font-semibold text-[#F5F5F5]">
                    {transaction.sender_name}
                </p>

                <p className="mt-1 text-[11px] text-[#A7A7AB]">
                    {transaction.mpesa_receipt_number}
                </p>
            </div>

            <div className="text-sm text-[#F5F5F5]">

                <p>
                    {transaction.phone_number}
                </p>

                <p className="mt-1 text-[11px] text-[#A7A7AB]">
                    {transaction.time}
                </p>

            </div>

            <div className="text-sm text-[#A7A7AB]">
                {transaction.till_number}
            </div>

            <div className="font-mono text-sm font-semibold text-[#F5F5F5]">
                {formatKES(transaction.amount)}
            </div>

            <div>
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass}`}
                >
                    {transaction.status}
                </span>
            </div>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Information Item
|--------------------------------------------------------------------------
*/

type InfoItemProps = {
    label: string;
    value: string;
};

function InfoItem({
    label,
    value,
}: InfoItemProps) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB]">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-[#F5F5F5]">
                {value}
            </p>
        </div>
    );
}