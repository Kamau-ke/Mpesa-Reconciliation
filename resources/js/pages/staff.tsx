import { Head } from '@inertiajs/react';
import { Clock, Receipt, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { dashboard } from '@/routes';
type StaffTransaction = {
    id: number;
    mpesaReceipt: string;
    amount: number;
    payerPhoneMasked: string;
    time: string;
};

type StaffDashboardProps = {
    staffName: string;
    shopName: string;
    tillNumber: string;
    shiftStatus: 'active' | 'ended';
    clockedInAt: string;
    today: {
        totalAmount: number;
        transactionCount: number;
    };
    thisWeek: {
        totalAmount: number;
        transactionCount: number;
    };
    recentTransactions: StaffTransaction[];
};

const DUMMY_DATA: StaffDashboardProps = {
    staffName: 'Faith',
    shopName: 'Mama Faith Duka',
    tillNumber: '4021990',
    shiftStatus: 'active',
    clockedInAt: '8:02 AM',
    today: {
        totalAmount: 18450,
        transactionCount: 27,
    },
    thisWeek: {
        totalAmount: 96200,
        transactionCount: 142,
    },
    recentTransactions: [
        { id: 1, mpesaReceipt: 'SGH4K9L2QX', amount: 1200, payerPhoneMasked: '•••• 214', time: '2:41 PM' },
        { id: 2, mpesaReceipt: 'SGH4K9M7RT', amount: 350, payerPhoneMasked: '•••• 872', time: '2:22 PM' },
        { id: 3, mpesaReceipt: 'SGH4K9J1WY', amount: 2500, payerPhoneMasked: '•••• 065', time: '1:58 PM' },
        { id: 4, mpesaReceipt: 'SGH4K9H4NC', amount: 600, payerPhoneMasked: '•••• 431', time: '1:15 PM' },
        { id: 5, mpesaReceipt: 'SGH4K9F0LD', amount: 150, payerPhoneMasked: '•••• 903', time: '12:47 PM' },
        { id: 6, mpesaReceipt: 'SGH4K9D6BQ', amount: 4000, payerPhoneMasked: '•••• 558', time: '11:59 AM' },
    ],
};

function formatKES(amount: number): string {
    return `KSh ${amount.toLocaleString('en-KE')}`;
}

export default function StaffDashboard(props: Partial<StaffDashboardProps> = {}) {
    const data: StaffDashboardProps = { ...DUMMY_DATA, ...props };
    const avgTicket = Math.round(data.thisWeek.totalAmount / Math.max(data.thisWeek.transactionCount, 1));

    return (
        <>
            <Head title="Today's Till" />

            <div className="min-h-svh bg-[#0a0a0a] font-[Nunito,sans-serif] text-zinc-100">
                <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-6 pb-24 sm:max-w-lg">
                    {/* Header */}
                    <header className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-zinc-500">Hi, {data.staffName}</p>
                            <h1 className="font-[Baloo_2,sans-serif] text-2xl font-bold tracking-tight text-white">
                                {data.shopName}
                            </h1>
                            <p className="mt-0.5 text-xs text-zinc-500">
                                Till <span className="font-mono text-zinc-400">{data.tillNumber}</span>
                            </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                            <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                            </span>
                            On shift
                        </span>
                    </header>

                    {/* Shift info strip */}
                    <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-400">
                        <Clock className="size-4 text-zinc-500" />
                        Clocked in at <span className="font-medium text-zinc-200">{data.clockedInAt}</span>
                    </div>

                    {/* Today's total — hero card */}
                    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/50 to-zinc-900/60 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-emerald-300/80">Today's till</p>
                            <Wallet className="size-5 text-emerald-400/70" />
                        </div>
                        <p className="mt-2 font-mono text-4xl font-bold tracking-tight text-white tabular-nums">
                            {formatKES(data.today.totalAmount)}
                        </p>
                        <p className="mt-1 text-sm text-zinc-400">
                            {data.today.transactionCount} transactions so far
                        </p>
                    </div>

                    {/* Secondary stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <TrendingUp className="size-3.5" />
                                This week
                            </div>
                            <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums">
                                {formatKES(data.thisWeek.totalAmount)}
                            </p>
                            <p className="text-xs text-zinc-500">{data.thisWeek.transactionCount} sales</p>
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <Receipt className="size-3.5" />
                                Avg. ticket
                            </div>
                            <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums">
                                {formatKES(avgTicket)}
                            </p>
                            <p className="text-xs text-zinc-500">last 7 days</p>
                        </div>
                    </div>

                    {/* Recent transactions */}
                    <section className="mt-2">
                        <div className="mb-2 flex items-center justify-between px-1">
                            <h2 className="text-sm font-semibold text-zinc-300">Recent transactions</h2>
                            <span className="text-xs text-zinc-500">{data.recentTransactions.length} shown</span>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60">
                            {data.recentTransactions.map((tx, index) => (
                                <div
                                    key={tx.id}
                                    className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
                                        index !== data.recentTransactions.length - 1
                                            ? 'border-b border-zinc-800/70'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                                            <Wallet className="size-4 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">
                                                {tx.payerPhoneMasked}
                                            </p>
                                            <p className="font-mono text-xs text-zinc-500">
                                                {tx.mpesaReceipt} · {tx.time}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm font-semibold text-emerald-400 tabular-nums">
                                        +{formatKES(tx.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* View-only notice */}
                    <div className="mt-2 flex items-start gap-2.5 rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-500">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-zinc-600" />
                        <p>
                            You have view-only access to today's transactions. Staff management and shop
                            settings are handled by your owner.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

StaffDashboard.layout = {
    breadcrumbs: [
        {
            title: "Today's Till",
            href: dashboard(),
        },
    ],
};