import { Head, Link, router } from '@inertiajs/react';
import NavBar from '@/components/nav-bar';

type TransactionStatus = 'success' | 'Pending' | 'cancelled' | 'Failed';

type Transaction = {
    id: number;
    mpesa_receipt_number: string;
    phone_number: string;
    sender_name: string;
    amount: number;
    status: TransactionStatus;
    created_at: string;
};

type Shop = {
    id: number;
    name: string;
    till_number: string;
};

type PaginatedTransactions = {
    data: Transaction[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
};

type FilterOption = 'today' | 'week' | 'all';

interface ShopTransactionsProps {
    shop: Shop;
    shops: Shop[];
    activeShopId: number;
    transactions: PaginatedTransactions;
    filter: FilterOption;
}

function formatKES(amount: number) {
    return `KES ${amount.toLocaleString('en-KE')}`;
}

function formatTime(dateString: string) {
    return new Date(dateString).toLocaleString('en-KE', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const FILTERS: { value: FilterOption; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'all', label: 'All time' },
];

export default function ShopTransactions({
    shop,
    shops,
    activeShopId,
    transactions,
    filter,
}: ShopTransactionsProps) {

    function applyFilter(value: FilterOption) {
        router.get(
            `/shop/${shop.id}/transactions`,
            { filter: value },
            { preserveState: true, preserveScroll: true },
        );
    }

    console.log(transactions);

    const statusClass: Record<TransactionStatus, string> = {
        success: 'bg-[#43B47E]/15 text-[#5FD69B]',
        Pending: 'bg-[#F2B84B]/15 text-[#F2B84B]',
        cancelled: 'bg-[#FF6B6B]/15 text-[#FF6B6B]',
        Failed: 'bg-[#FF6B6B]/15 text-[#FF6B6B]',
    };

    return (
        <>
            <Head title={`${shop.name} — Transactions`} />

            <div className="min-h-screen bg-[#101010] text-[#F5F5F5] [font-family:'Inter',ui-sans-serif,sans-serif]">
                <div className="flex min-h-screen">

                    <NavBar
                        shops={shops}
                        activeShopId={activeShopId}
                        showTransactionsTab
                        // transactionsHref={`/shop/${shop.id}/transactions`}
                    />

                    <main className="min-w-0 flex-1">

                        <header className="border-b border-[#353538] bg-[#1B1B1D] px-5 py-5 sm:px-6 lg:px-10">
                            <p className="truncate text-xs font-semibold text-[#A7A7AB]">
                                {shop.name}
                            </p>

                            <h1
                                className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl"
                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                            >
                                Transactions
                            </h1>
                        </header>

                        <div className="p-5 sm:p-6 lg:p-10">

                            {/* Filter tabs */}
                            <div className="mb-5 flex gap-2">
                                {FILTERS.map((f) => (
                                    <button
                                        key={f.value}
                                        type="button"
                                        onClick={() => applyFilter(f.value)}
                                        className={[
                                            'rounded-full px-4 py-2 text-sm font-semibold transition',
                                            filter === f.value
                                                ? 'bg-[#43B47E] text-[#101010]'
                                                : 'border border-[#353538] text-[#A7A7AB] hover:bg-[#242426] hover:text-[#F5F5F5]',
                                        ].join(' ')}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            <section className="overflow-hidden rounded-2xl border border-[#353538] bg-[#1B1B1D]">

                                <div className="hidden grid-cols-[1.1fr_1fr_0.9fr_0.8fr] border-b border-[#353538] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB] md:grid">
                                    <span>Receipt</span>
                                    <span>Customer</span>
                                    <span>Amount</span>
                                    <span>Status</span>
                                </div>

                                <div className="divide-y divide-[#353538]">

                                    {transactions.length === 0 && (
                                        <p className="px-5 py-6 text-sm text-[#A7A7AB]">
                                            No transactions found for this period.
                                        </p>
                                    )}

                                    {transactions.map((t) => (
                                        <div
                                            key={t.id}
                                            className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_1fr_0.9fr_0.8fr] md:items-center"
                                        >
                                            <div>
                                                <p className="font-mono text-sm font-semibold text-[#F5F5F5]">
                                                    {t.mpesa_receipt_number}
                                                </p>
                                                <p className="mt-1 text-[11px] text-[#A7A7AB]">
                                                    {formatTime(t.created_at)}
                                                </p>
                                            </div>

                                            <div className="text-sm text-[#F5F5F5]">
                                                <p>{t.sender_name}</p>
                                                <p className="mt-1 text-[11px] text-[#A7A7AB]">
                                                    {t.phone_number}
                                                </p>
                                            </div>

                                            <div className="font-mono text-sm font-semibold text-[#F5F5F5]">
                                                {formatKES(t.amount)}
                                            </div>

                                            <div>
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass[t.status]}`}>
                                                    {t.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </section>

                            {/* Pagination */}
                            {transactions.last_page > 1 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {transactions.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? '#'}
                                            preserveState
                                            preserveScroll
                                            className={[
                                                'rounded-lg px-3 py-1.5 text-sm font-semibold transition',
                                                link.active
                                                    ? 'bg-[#43B47E] text-[#101010]'
                                                    : link.url
                                                        ? 'text-[#A7A7AB] hover:bg-[#242426] hover:text-[#F5F5F5]'
                                                        : 'cursor-not-allowed text-[#4A4A4D]',
                                            ].join(' ')}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>

                    </main>

                </div>
            </div>
        </>
    );
}