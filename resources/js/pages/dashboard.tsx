// resources/js/pages/dashboard.tsx
//
// Kadogo — Ink + Gold palette.
// Dummy data is used when no real props are passed from the controller.
// All monetary totals still follow the server-first rule — the dummy
// data is only a fallback for local dev / design review; in production
// DashboardController always supplies real props.

import { useState } from 'react';
import Seo from '@/components/kadogo/seo';
import TopBar from '@/components/kadogo/dashboard/top-bar';
import TabNav from '@/components/kadogo/dashboard/tab-nav';
import StatCard from '@/components/kadogo/dashboard/stat-card';
import TransactionTable from '@/components/kadogo/dashboard/transaction-table';
import StaffPanel from '@/components/kadogo/dashboard/staff-panel';
import ShopPanel from '@/components/kadogo/dashboard/shop-panel';
import { K } from '@/lib/kadogo-token';
import type { DashboardProps, TabKey } from '@/types/dashboard';

// ── dummy data ────────────────────────────────────────────────────────────────
const DUMMY_SHOP = {
    id:         1,
    name:       'Njoroge General Store',
    tillNumber: '923481',
    location:   'Kawangware, Nairobi',
    currency:   'KES',
};

const DUMMY_TRANSACTIONS = [
    { id: 'QFX7R2KP', time: '07:04', payer: 'A. Mwathi',   amount: 250,   status: 'paid'    },
    { id: 'QFX8T9LM', time: '07:31', payer: 'D. Otieno',   amount: 450,   status: 'paid'    },
    { id: 'QFX2N4QR', time: '08:12', payer: 'A. Kimani',   amount: 2000,  status: 'paid'    },
    { id: 'QFX9J1XZ', time: '08:45', payer: 'F. Mwangi',   amount: 800,   status: 'paid'    },
    { id: 'QFX9J1XZ', time: '08:46', payer: 'F. Mwangi',   amount: 800,   status: 'flagged' },
    { id: 'QFX3K7VB', time: '09:03', payer: 'M. Wanjiru',  amount: 1200,  status: 'paid'    },
    { id: 'QFX1H5WD', time: '09:22', payer: 'S. Achieng',  amount: 1500,  status: 'paid'    },
    { id: 'QFX6Y2TC', time: '09:40', payer: 'J. Kariuki',  amount: 300,   status: 'paid'    },
    { id: 'QFX4P8NS', time: '10:05', payer: 'P. Njoroge',  amount: 950,   status: 'paid'    },
    { id: 'QFX5M3RQ', time: '10:18', payer: 'B. Otieno',   amount: 600,   status: 'paid'    },
    { id: 'QFX0L6YW', time: '10:44', payer: 'C. Waweru',   amount: 3200,  status: 'paid'    },
    { id: 'QFXA1K9E', time: '11:02', payer: 'E. Ndungu',   amount: 750,   status: 'paid'    },
    { id: 'QFXB3T2P', time: '11:29', payer: 'H. Kamau',    amount: 180,   status: 'paid'    },
    { id: 'QFXC7W4V', time: '11:55', payer: 'L. Maina',    amount: 4200,  status: 'paid'    },
    { id: 'QFXD2Q8U', time: '12:08', payer: 'N. Wairimu',  amount: 525,   status: 'paid'    },
] as const;

const DUMMY_STAFF = [
    { id: 1, name: 'Grace Achieng', email: 'grace@example.com',  status: 'active',      addedOn: '12 Jun' },
    { id: 2, name: 'Brian Otieno',  email: 'brian@example.com',  status: 'active',      addedOn: '3 Jul'  },
    { id: 3, name: 'Faith Mwangi',  email: 'faith@example.com',  status: 'deactivated', addedOn: '19 Apr' },
] as const;

// pre-computed from DUMMY_TRANSACTIONS so the component never sums in JSX
const DUMMY_TODAY   = DUMMY_TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0);
const DUMMY_YEST    = 35890;
const DUMMY_WEEK    = 198450;
const DUMMY_MONTH   = 812300;
const DUMMY_COUNT   = DUMMY_TRANSACTIONS.filter(t => t.status === 'paid').length;
const DUMMY_AVG     = Math.round(DUMMY_TODAY / DUMMY_COUNT);
const DUMMY_FLAGGED = DUMMY_TRANSACTIONS.filter(t => t.status === 'flagged').length;

// ── helpers ───────────────────────────────────────────────────────────────────
function kes(n: number) {
    return `KES ${n.toLocaleString('en-KE')}`;
}

// ── icons ─────────────────────────────────────────────────────────────────────
function TrendUpIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function TrendDownIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>; }
function AlertIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }

// ── trend badge ───────────────────────────────────────────────────────────────
function TrendBadge({ today, yesterday }: { today: number; yesterday: number }) {
    if (!yesterday) return null;
    const pct = Math.round(((today - yesterday) / yesterday) * 100);
    const up  = pct >= 0;
    return (
        <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full mt-2"
            style={{ fontFamily: K.mono, background: '#3A3A3C', color: K.gold }}
        >
            {up ? <TrendUpIcon /> : <TrendDownIcon />}
            {up ? '+' : ''}{pct}% vs yesterday
        </span>
    );
}

// ── overview tab ──────────────────────────────────────────────────────────────
function OverviewTab({
    todayTotal, yesterdayTotal, weekTotal, monthTotal,
    txnCount, avgSale, flagged, transactions,
}: DashboardProps) {
    return (
        <div className="flex flex-col gap-5">

            {/* hero card */}
            <div
                className="rounded-2xl px-6 py-5 flex justify-between items-center gap-4 flex-wrap"
                style={{ background: K.hero }}
            >
                <div>
                    <span
                        className="text-[11px] uppercase tracking-widest font-bold block mb-1"
                        style={{ fontFamily: K.mono, color: K.muted }}
                    >
                        Today's takings
                    </span>
                    <span
                        className="text-4xl sm:text-5xl font-bold leading-none block"
                        style={{ fontFamily: K.mono, color: K.gold }}
                    >
                        {kes(todayTotal)}
                    </span>
                    <TrendBadge today={todayTotal} yesterday={yesterdayTotal} />
                </div>
                <div className="flex gap-6 sm:gap-8">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold block mb-1" style={{ fontFamily: K.mono, color: K.muted }}>
                            Receipts
                        </span>
                        <span className="text-2xl font-bold" style={{ fontFamily: K.mono, color: '#F5F5F5' }}>
                            {txnCount}
                        </span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold block mb-1" style={{ fontFamily: K.mono, color: K.muted }}>
                            Average
                        </span>
                        <span className="text-2xl font-bold" style={{ fontFamily: K.mono, color: '#F5F5F5' }}>
                            {kes(avgSale)}
                        </span>
                    </div>
                </div>
            </div>

            {/* stat grid */}
            <div className="grid grid-cols-2 gap-3">
                <StatCard label="This week"  value={kes(weekTotal)}  icon={<TrendUpIcon />} />
                <StatCard label="This month" value={kes(monthTotal)} icon={<TrendUpIcon />} />
            </div>

            {/* duplicate alert */}
            {flagged > 0 && (
                <div
                    className="flex items-start gap-3 rounded-2xl px-4 py-3.5"
                    style={{ background: K.dupBg }}
                    role="alert"
                >
                    <span style={{ color: K.alertC, marginTop: 1 }}><AlertIcon /></span>
                    <div>
                        <p className="font-bold text-[13px]" style={{ color: K.dupC, fontFamily: K.display }}>
                            {flagged} duplicate receipt{flagged > 1 ? 's' : ''} blocked
                        </p>
                        <p className="text-[12px] mt-0.5" style={{ fontFamily: K.mono, color: K.alertTxt }}>
                            Callbacks rejected — your total is unaffected. Review below if needed.
                        </p>
                    </div>
                </div>
            )}

            {/* recent receipts */}
            <h2 style={{ fontFamily: K.display, color: K.ink }} className="font-extrabold text-[16px]">
                Today's receipts
            </h2>
            <TransactionTable transactions={DUMMY_TRANSACTIONS} />
        </div>
    );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function Dashboard({
    shop         = DUMMY_SHOP,
    todayTotal   = DUMMY_TODAY,
    yesterdayTotal = DUMMY_YEST,
    weekTotal    = DUMMY_WEEK,
    monthTotal   = DUMMY_MONTH,
    txnCount     = DUMMY_COUNT,
    avgSale      = DUMMY_AVG,
    flagged      = DUMMY_FLAGGED,
    transactions = DUMMY_TRANSACTIONS as unknown as DashboardProps['transactions'],
    staff        = DUMMY_STAFF as unknown as DashboardProps['staff'],
    isOwner      = true,
}: Partial<DashboardProps>) {
    const [tab, setTab] = useState<TabKey>('overview');

    const props: DashboardProps = {
        shop, todayTotal, yesterdayTotal, weekTotal, monthTotal,
        txnCount, avgSale, flagged, transactions, staff, isOwner,
    };

    return (
        <>
            <Seo title="Dashboard" description="Your daily M-Pesa reconciliation." noindex />

            <div
                className="min-h-screen antialiased"
                style={{ background: K.bg, color: K.ink, fontFamily: K.body }}
            >
                <TopBar shop={shop} />
                <TabNav active={tab} onChange={setTab} isOwner={isOwner} />

                <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20">

                    {tab === 'overview' && <OverviewTab {...props} />}

                    {tab === 'transactions' && (
                        <div className="flex flex-col gap-4">
                            <h2 style={{ fontFamily: K.display, color: K.ink }} className="font-extrabold text-[16px]">
                                All receipts today
                            </h2>
                            <TransactionTable transactions={DUMMY_TRANSACTIONS} />
                        </div>
                    )}

                    {tab === 'staff' && isOwner && (
                        <div className="flex flex-col gap-4">
                            <h2 style={{ fontFamily: K.display, color: K.ink }} className="font-extrabold text-[16px]">
                                Staff
                            </h2>
                            <StaffPanel staff={staff} />
                        </div>
                    )}

                    {tab === 'shop' && (
                        <div className="flex flex-col gap-4">
                            <h2 style={{ fontFamily: K.display, color: K.ink }} className="font-extrabold text-[16px]">
                                Shop
                            </h2>
                            <ShopPanel shop={shop} isOwner={isOwner} />
                        </div>
                    )}

                </main>
            </div>
        </>
    );
}