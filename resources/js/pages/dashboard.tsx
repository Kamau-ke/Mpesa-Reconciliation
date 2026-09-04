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

interface transactionProps{
    latestTransactions:Transaction[];
    sumOfAllTransactions:number;
    sumOfTodayTransactions:number;
}

type Owner = {
    name: string;
    shopName: string;
    role: string;
};

type AuthUser={
    id: number;
    name: string;
    email: string;
}

type PageProps = {
    auth: {
        user: AuthUser;
    };
};

type DashboardStats = {
    todayCollections: number;
    reconciledAmount: number;
    pendingAmount: number;
    exceptions: number;
    totalTransactions: number;
    matchedTransactions: number;
};


const owner: Owner = {
    name: 'Ian Kamau',
    shopName: 'Kadogo Shop',
    role: 'Owner',
};

const stats: DashboardStats = {
    todayCollections: 45600,
    reconciledAmount: 41200,
    pendingAmount: 2400,
    exceptions: 7,
    totalTransactions: 128,
    matchedTransactions: 116,
};



const shop = {
    name: 'Kadogo Shop',
    till: 'Till 01',
    location: 'Nyeri, Kenya',
    phone: '0712 456 789',
};

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

export default function Dashboard({latestTransactions, sumOfAllTransactions, sumOfTodayTransactions}) {
    const { auth } = usePage<PageProps>().props;

    
    const reconciliationRate =
        stats.totalTransactions > 0
            ? Math.round(
                  (stats.matchedTransactions / stats.totalTransactions) * 100,
              )
            : 0;

    return (
        <>
            <Head title="Owner Dashboard" />

            

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
                        <nav className="flex-1 px-4">

                            <NavItem
                                label="Dashboard"
                                href="/owner/dashboard"
                                active
                            />

                            <NavItem
                                label="Transactions"
                                href="/owner/transactions"
                            />

                            <NavItem
                                label="Reconciliation"
                                href="/owner/reconciliation"
                            />

                            <div className="pb-2 pt-7">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                                    Shop
                                </p>
                            </div>

                            <NavItem
                                label="Shop"
                                href="/owner/shop"
                            />

                            <NavItem
                                label="Profile"
                                href="/owner/profile"
                            />

                            <div className="pb-2 pt-7">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                                    Management
                                </p>
                            </div>

                            <NavItem
                                label="Employees"
                                href="/owner/employees"
                            />

                            <NavItem
                                label="Tills"
                                href="/owner/tills"
                            />

                        </nav>

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
                                        {owner.shopName}
                                    </p>

                                    <h1
                                        className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl"
                                        style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                    >
                                        Good morning, {auth.user.name.split(' ')[0]}
                                    </h1>

                                    <p className="mt-1 hidden text-sm text-[#A7A7AB] sm:block">
                                        Here's your M-Pesa reconciliation overview.
                                    </p>

                                </div>

                                <div className="hidden text-right sm:block">

                                    <p className="text-sm font-semibold text-[#F5F5F5]">
                                        Saturday, 22 August
                                    </p>

                                    <p className="mt-1 text-xs text-[#A7A7AB]">
                                        Owner account
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
                                        Monitor collections and reconciliation activity.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                    <StatCard
                                        label="Today's Collections"
                                        value={formatKES(sumOfTodayTransactions)}
                                        description="Total M-Pesa received"
                                        accent="green"
                                    />

                                    <StatCard
                                        label="Total Transactions"
                                        value={formatKES(stats.reconciledAmount)}
                                        description={`${reconciliationRate}% successfully matched`}
                                        accent="green"
                                    />

                                    <StatCard
                                        label="Successful Transaction"
                                        value={formatKES(stats.pendingAmount)}
                                        description="Awaiting reconciliation"
                                        accent="yellow"
                                    />

                                    <StatCard
                                        label="Cancelled"
                                        value={stats.exceptions.toString()}
                                        description="Transactions need attention"
                                        accent="red"
                                    />

                                </div>

                            </section>

                            {/* ==================================================
                                MAIN GRID
                            ================================================== */}

                            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">

                                {/* ==================================================
                                    TRANSACTIONS
                                ================================================== */}

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
                                                Latest M-Pesa activity from your shop
                                            </p>
                                        </div>

                                        <Link
                                            href="/owner/transactions"
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
                                        {latestTransactions.map((transaction) => (
                                            <TransactionRow
                                                key={transaction.id}
                                                transaction={transaction}
                                            />
                                        ))}

                                    </div>

                                </section>

                                {/* ==================================================
                                    RECONCILIATION SUMMARY
                                ================================================== */}

                                <section className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">

                                    <div>
                                        <h2
                                            className="font-bold text-[#F5F5F5]"
                                            style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                        >
                                            Reconciliation
                                        </h2>

                                        <p className="mt-1 text-xs text-[#A7A7AB]">
                                            Today's transaction status
                                        </p>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-7">

                                        <div className="flex items-end justify-between">

                                            <div>
                                                <p className="font-mono text-3xl font-bold text-[#F5F5F5]">
                                                    {reconciliationRate}%
                                                </p>

                                                <p className="mt-1 text-xs text-[#A7A7AB]">
                                                    Reconciled
                                                </p>
                                            </div>

                                            <p className="text-xs font-semibold text-[#43B47E]">
                                                {stats.matchedTransactions} / {stats.totalTransactions}
                                            </p>

                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#242426]">

                                            <div
                                                className="h-full rounded-full bg-[#43B47E] transition-all"
                                                style={{
                                                    width: `${reconciliationRate}%`,
                                                }}
                                            />

                                        </div>

                                    </div>

                                    {/* Status breakdown */}
                                    <div className="mt-7 space-y-4">

                                        <StatusSummary
                                            label="Matched"
                                            value={stats.matchedTransactions}
                                            total={stats.totalTransactions}
                                            type="matched"
                                        />

                                        <StatusSummary
                                            label="Pending"
                                            value={12}
                                            total={stats.totalTransactions}
                                            type="pending"
                                        />

                                        <StatusSummary
                                            label="Exceptions"
                                            value={stats.exceptions}
                                            total={stats.totalTransactions}
                                            type="exception"
                                        />

                                    </div>

                                    <Link
                                        href="/owner/reconciliation"
                                        className="mt-7 block rounded-xl bg-[#43B47E] px-4 py-3 text-center text-sm font-bold text-[#101010] transition hover:bg-[#57C68E]"
                                        style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                    >
                                        Review reconciliation
                                    </Link>

                                </section>

                            </div>

                            {/* ==================================================
                                BOTTOM GRID
                            ================================================== */}

                            <div className="mt-6 grid gap-6 lg:grid-cols-2">

                                {/* Shop */}
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
                                                Your business information
                                            </p>
                                        </div>

                                        <Link
                                            href="/owner/shop"
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
                                            value={shop.till}
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

                                {/* Quick Actions */}
                                <section className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">

                                    <div>
                                        <h2
                                            className="font-bold text-[#F5F5F5]"
                                            style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                        >
                                            Quick actions
                                        </h2>

                                        <p className="mt-1 text-xs text-[#A7A7AB]">
                                            Common tasks for your shop
                                        </p>
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                                        <QuickAction
                                            title="View transactions"
                                            description="Search M-Pesa activity"
                                            href="/owner/transactions"
                                        />

                                        <QuickAction
                                            title="Reconcile"
                                            description="Review unmatched payments"
                                            href="/owner/reconciliation"
                                        />

                                        <QuickAction
                                            title="Manage shop"
                                            description="Update business details"
                                            href="/owner/shop"
                                        />

                                        <QuickAction
                                            title="View profile"
                                            description="Manage your account"
                                            href="/owner/profile"
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
| Owner Menu (profile trigger + dropdown)
|--------------------------------------------------------------------------
*/

type OwnerMenuProps = {
    owner: Owner;
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
                        {auth.user.role}
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
        success: 'bg-[#43B47E]/15 text-[#5FD69B]',
        Pending: 'bg-[#F2B84B]/15 text-[#F2B84B]',
        cancelled: 'bg-[#FF6B6B]/15 text-[#FF6B6B]',
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
| Status Summary
|--------------------------------------------------------------------------
*/

type StatusSummaryProps = {
    label: string;
    value: number;
    total: number;
    type: 'pending' | 'success' | 'cancelled'; 
};

function StatusSummary({
    label,
    value,
    total,
    type,
}: StatusSummaryProps) {

    const percentage =
        total > 0
            ? Math.round((value / total) * 100)
            : 0;

    const dotClass = {
        pending: 'bg-[#43B47E]',
        success: 'bg-[#F2B84B]',
        cancelled: 'bg-[#FF6B6B]',
    }[type];

    return (
        <div>

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <span
                        className={`h-2 w-2 rounded-full ${dotClass}`}
                    />

                    <span className="text-sm font-semibold text-[#F5F5F5]">
                        {label}
                    </span>

                </div>

                <span className="font-mono text-xs text-[#A7A7AB]">
                    {value}
                </span>

            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#242426]">

                <div
                    className={`h-full rounded-full ${dotClass}`}
                    style={{
                        width: `${Math.min(percentage, 100)}%`,
                    }}
                />

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

/*
|--------------------------------------------------------------------------
| Quick Action
|--------------------------------------------------------------------------
*/

type QuickActionProps = {
    title: string;
    description: string;
    href: string;
};

function QuickAction({
    title,
    description,
    href,
}: QuickActionProps) {
    return (
        <Link
            href={href}
            className="group rounded-xl border border-[#353538] bg-[#242426] p-4 transition hover:border-[#43B47E] hover:bg-[#2A2A2D]"
        >
            <div className="flex items-center justify-between gap-3">

                <div>
                    <p className="text-sm font-bold text-[#F5F5F5]">
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-[#A7A7AB]">
                        {description}
                    </p>
                </div>

                <span className="text-lg text-[#A7A7AB] transition group-hover:translate-x-0.5 group-hover:text-[#43B47E]">
                    →
                </span>

            </div>
        </Link>
    );
}