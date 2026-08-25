
import { Head, Link } from '@inertiajs/react';

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type TransactionStatus =
    | 'Matched'
    | 'Pending'
    | 'Unmatched'
    | 'Failed';

type Transaction = {
    id: number;
    reference: string;
    mpesaReceipt: string;
    phone: string;
    employee: string;
    till: string;
    amount: number;
    status: TransactionStatus;
    time: string;
};

type Owner = {
    name: string;
    shopName: string;
    role: string;
};

type DashboardStats = {
    todayCollections: number;
    reconciledAmount: number;
    pendingAmount: number;
    exceptions: number;
    totalTransactions: number;
    matchedTransactions: number;
};

/*
|--------------------------------------------------------------------------
| Dummy Data
|--------------------------------------------------------------------------
|
| Authentication has not been implemented yet, so the owner/shop data
| is intentionally kept here for development.
|
*/

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

const transactions: Transaction[] = [
    {
        id: 1,
        reference: 'TXN-1001',
        mpesaReceipt: 'QGH7A8B9C1',
        phone: '0712 456 789',
        employee: 'Mary Wanjiku',
        till: 'Till 01',
        amount: 1200,
        status: 'Matched',
        time: '10:42 AM',
    },
    {
        id: 2,
        reference: 'TXN-1002',
        mpesaReceipt: 'QGH7A8B9C2',
        phone: '0721 345 678',
        employee: 'Peter Kamau',
        till: 'Till 02',
        amount: 850,
        status: 'Matched',
        time: '10:35 AM',
    },
    {
        id: 3,
        reference: 'TXN-1003',
        mpesaReceipt: 'QGH7A8B9C3',
        phone: '0708 234 567',
        employee: 'John Mwangi',
        till: 'Till 01',
        amount: 2400,
        status: 'Pending',
        time: '10:21 AM',
    },
    {
        id: 4,
        reference: 'TXN-1004',
        mpesaReceipt: 'QGH7A8B9C4',
        phone: '0798 456 123',
        employee: 'Mary Wanjiku',
        till: 'Till 03',
        amount: 500,
        status: 'Matched',
        time: '09:58 AM',
    },
    {
        id: 5,
        reference: 'TXN-1005',
        mpesaReceipt: 'QGH7A8B9C5',
        phone: '0715 987 654',
        employee: 'Peter Kamau',
        till: 'Till 02',
        amount: 1750,
        status: 'Unmatched',
        time: '09:41 AM',
    },
];

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

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export default function Dashboard() {
    const reconciliationRate =
        stats.totalTransactions > 0
            ? Math.round(
                  (stats.matchedTransactions / stats.totalTransactions) * 100,
              )
            : 0;

    return (
        <>
            <Head title="Owner Dashboard" />

            <div className="min-h-screen bg-[#FFF4DA] text-[#2B2B2B]">
                <div className="flex min-h-screen">

                    {/* ======================================================
                        SIDEBAR
                    ====================================================== */}

                    <aside className="hidden w-64 shrink-0 border-r border-[#E6DAB8] bg-[#FFFBF2] lg:flex lg:flex-col">

                        {/* Logo */}
                        <div className="px-6 pb-8 pt-7">
                            <div className="text-2xl font-bold tracking-tight">
                                kadogo
                            </div>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8578]">
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
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8578]">
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
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8578]">
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
                        <div className="border-t border-[#E6DAB8] p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4E7D67] text-sm font-bold text-white">
                                    {getInitials(owner.name)}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold">
                                        {owner.name}
                                    </p>

                                    <p className="text-xs text-[#8A8578]">
                                        {owner.role}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </aside>

                    {/* ======================================================
                        MAIN
                    ====================================================== */}

                    <main className="min-w-0 flex-1">

                        {/* Header */}
                        <header className="border-b border-[#E6DAB8] bg-[#FFFBF2] px-5 py-5 sm:px-6 lg:px-10">

                            <div className="flex items-center justify-between gap-5">

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-semibold text-[#8A8578]">
                                        {owner.shopName}
                                    </p>

                                    <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                                        Good morning, {owner.name.split(' ')[0]}
                                    </h1>

                                    <p className="mt-1 hidden text-sm text-[#8A8578] sm:block">
                                        Here's your M-Pesa reconciliation overview.
                                    </p>

                                </div>

                                <div className="hidden text-right sm:block">

                                    <p className="text-sm font-semibold">
                                        Saturday, 22 August
                                    </p>

                                    <p className="mt-1 text-xs text-[#8A8578]">
                                        Owner account
                                    </p>

                                </div>

                            </div>

                        </header>

                        {/* Content */}
                        <div className="p-5 sm:p-6 lg:p-10">

                            {/* ==================================================
                                OVERVIEW
                            ================================================== */}

                            <section>

                                <div className="mb-5">
                                    <h2 className="text-base font-bold">
                                        Today's overview
                                    </h2>

                                    <p className="mt-1 text-xs text-[#8A8578]">
                                        Monitor collections and reconciliation activity.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                    <StatCard
                                        label="Today's Collections"
                                        value={formatKES(stats.todayCollections)}
                                        description="Total M-Pesa received"
                                        accent="green"
                                    />

                                    <StatCard
                                        label="Reconciled"
                                        value={formatKES(stats.reconciledAmount)}
                                        description={`${reconciliationRate}% successfully matched`}
                                        accent="green"
                                    />

                                    <StatCard
                                        label="Pending"
                                        value={formatKES(stats.pendingAmount)}
                                        description="Awaiting reconciliation"
                                        accent="yellow"
                                    />

                                    <StatCard
                                        label="Exceptions"
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

                                <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E6DAB8] bg-[#FFFBF2]">

                                    <div className="flex items-center justify-between gap-4 border-b border-[#E6DAB8] px-5 py-5">

                                        <div>
                                            <h2 className="font-bold">
                                                Recent Transactions
                                            </h2>

                                            <p className="mt-1 text-xs text-[#8A8578]">
                                                Latest M-Pesa activity from your shop
                                            </p>
                                        </div>

                                        <Link
                                            href="/owner/transactions"
                                            className="shrink-0 text-sm font-bold text-[#4E7D67] hover:text-[#355B49]"
                                        >
                                            View all
                                        </Link>

                                    </div>

                                    {/* Table header */}
                                    <div className="hidden grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.8fr] border-b border-[#E6DAB8] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8A8578] md:grid">

                                        <span>Reference</span>
                                        <span>Customer</span>
                                        <span>Till</span>
                                        <span>Amount</span>
                                        <span>Status</span>

                                    </div>

                                    {/* Rows */}
                                    <div className="divide-y divide-[#E6DAB8]">

                                        {transactions.map((transaction) => (
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

                                <section className="rounded-2xl border border-[#E6DAB8] bg-[#FFFBF2] p-5">

                                    <div>
                                        <h2 className="font-bold">
                                            Reconciliation
                                        </h2>

                                        <p className="mt-1 text-xs text-[#8A8578]">
                                            Today's transaction status
                                        </p>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-7">

                                        <div className="flex items-end justify-between">

                                            <div>
                                                <p className="font-mono text-3xl font-bold">
                                                    {reconciliationRate}%
                                                </p>

                                                <p className="mt-1 text-xs text-[#8A8578]">
                                                    Reconciled
                                                </p>
                                            </div>

                                            <p className="text-xs font-semibold text-[#4E7D67]">
                                                {stats.matchedTransactions} / {stats.totalTransactions}
                                            </p>

                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E6DAB8]">

                                            <div
                                                className="h-full rounded-full bg-[#4E7D67] transition-all"
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
                                        className="mt-7 block rounded-xl bg-[#4E7D67] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#3D6855]"
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
                                <section className="rounded-2xl border border-[#E6DAB8] bg-[#FFFBF2] p-5">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h2 className="font-bold">
                                                Shop profile
                                            </h2>

                                            <p className="mt-1 text-xs text-[#8A8578]">
                                                Your business information
                                            </p>
                                        </div>

                                        <Link
                                            href="/owner/shop"
                                            className="text-sm font-bold text-[#4E7D67]"
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
                                <section className="rounded-2xl border border-[#E6DAB8] bg-[#FFFBF2] p-5">

                                    <div>
                                        <h2 className="font-bold">
                                            Quick actions
                                        </h2>

                                        <p className="mt-1 text-xs text-[#8A8578]">
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
                    ? 'bg-[#4E7D67] text-white'
                    : 'text-[#2B2B2B] hover:bg-[#FFF4DA]',
            ].join(' ')}
        >
            {label}
        </Link>
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
        green: 'bg-[#4E7D67]',
        yellow: 'bg-[#F2B84B]',
        red: 'bg-[#E85D5D]',
    };

    return (
        <div className="rounded-2xl border border-[#E6DAB8] bg-[#FFFBF2] p-5">

            <div className="flex items-center justify-between gap-3">

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8578]">
                    {label}
                </p>

                <span
                    className={`h-2 w-2 rounded-full ${accentStyles[accent]}`}
                />

            </div>

            <p className="mt-4 font-mono text-2xl font-bold tracking-tight">
                {value}
            </p>

            <p className="mt-2 text-xs text-[#8A8578]">
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
        Matched: 'bg-[#4E7D67]/10 text-[#4E7D67]',
        Pending: 'bg-[#F2B84B]/20 text-[#8A6500]',
        Unmatched: 'bg-[#E85D5D]/10 text-[#C44747]',
        Failed: 'bg-[#E85D5D]/10 text-[#C44747]',
    }[transaction.status];

    return (
        <div className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_1fr_0.8fr_0.9fr_0.8fr] md:items-center">

            <div>
                <p className="font-mono text-sm font-semibold">
                    {transaction.reference}
                </p>

                <p className="mt-1 text-[11px] text-[#8A8578]">
                    {transaction.mpesaReceipt}
                </p>
            </div>

            <div className="text-sm">

                <p>
                    {transaction.phone}
                </p>

                <p className="mt-1 text-[11px] text-[#8A8578]">
                    {transaction.time}
                </p>

            </div>

            <div className="text-sm text-[#8A8578]">
                {transaction.till}
            </div>

            <div className="font-mono text-sm font-semibold">
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
    type: 'matched' | 'pending' | 'exception';
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
        matched: 'bg-[#4E7D67]',
        pending: 'bg-[#F2B84B]',
        exception: 'bg-[#E85D5D]',
    }[type];

    return (
        <div>

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <span
                        className={`h-2 w-2 rounded-full ${dotClass}`}
                    />

                    <span className="text-sm font-semibold">
                        {label}
                    </span>

                </div>

                <span className="font-mono text-xs text-[#8A8578]">
                    {value}
                </span>

            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E6DAB8]">

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
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8578]">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold">
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
            className="group rounded-xl border border-[#E6DAB8] p-4 transition hover:border-[#4E7D67] hover:bg-[#FFF4DA]"
        >
            <div className="flex items-center justify-between gap-3">

                <div>
                    <p className="text-sm font-bold">
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-[#8A8578]">
                        {description}
                    </p>
                </div>

                <span className="text-lg text-[#8A8578] transition group-hover:translate-x-0.5 group-hover:text-[#4E7D67]">
                    →
                </span>

            </div>
        </Link>
    );
}

