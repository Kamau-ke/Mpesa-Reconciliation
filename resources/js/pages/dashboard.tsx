import { useMemo, useState } from 'react';
import Seo from '@/components/kadogo/seo';
import TopBar from '@/components/kadogo/dashboard/top-bar';
import TabNav from '@/components/kadogo/dashboard/tab-nav';
import StatCard from '@/components/kadogo/dashboard/stat-card';
import TransactionTable from '@/components/kadogo/dashboard/transaction-table';
import StaffPanel from '@/components/kadogo/dashboard/staff-panel';
import ShopPanel from '@/components/kadogo/dashboard/shop-panel';
import type { DashboardProps, TabKey } from '@/types/dashboard';

// ─── design tokens ──────────────────────────────────────────────────────────
const CREAM   = '#F7F1E1';   // parchment background
const CHAR    = '#111111';   // ink
const AVOCADO = '#0F6B4B';   // success
const TOMATO  = '#B42318';   // danger
const MUTED   = '#6B7280';

const GOLD      = '#D4A017';
const GOLD_SOFT = '#F3D98B';
const GOLD_DARK = '#9A6F00';

const MONO    = '"IBM Plex Mono", ui-monospace, monospace';
const DISPLAY = '"Fraunces", Georgia, serif';;

// ─── helpers ────────────────────────────────────────────────────────────────
function kes(n: number): string {
    return `KES ${n.toLocaleString('en-KE')}`;
}

// ─── icons ──────────────────────────────────────────────────────────────────
function TrendUpIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
        </svg>
    );
}
function TrendDownIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
            <polyline points="17 18 23 18 23 12"/>
        </svg>
    );
}
function ReceiptIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/>
        </svg>
    );
}
function AverageIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <line x1="12" y1="5" x2="12" y2="19"/>
        </svg>
    );
}
function AlertIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
    );
}

// ─── sparkline (inline SVG, no lib) ─────────────────────────────────────────
function Sparkline({ color }: { color: string }) {
    return (
        <svg viewBox="0 0 200 50" className="w-full h-10" aria-hidden="true">
            <path
                d="M0,40 C15,38 25,28 40,30 S60,18 75,16 S95,6 110,4 S130,18 145,20 S170,30 200,24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

// ─── trend badge ─────────────────────────────────────────────────────────────
function TrendBadge({ today, yesterday }: { today: number; yesterday: number }) {
    if (yesterday === 0) return null;
    const pct = Math.round(((today - yesterday) / yesterday) * 100);
    const up  = pct >= 0;

    return (
        <span
            className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{
                fontFamily: MONO,
                background: up ? '#D4EDDA' : '#FDEAEA',
                color: up ? AVOCADO : TOMATO,
            }}
        >
            {up ? <TrendUpIcon /> : <TrendDownIcon />}
            {up ? '+' : ''}{pct}% vs yesterday
        </span>
    );
}

// ─── overview tab ────────────────────────────────────────────────────────────
function OverviewTab({
    todayTotal, yesterdayTotal, weekTotal, monthTotal,
    txnCount, avgSale, flagged, transactions,
}: DashboardProps) {
    return (
        <div className="flex flex-col gap-6">

            {/* hero total */}
            <div
                className="rounded-2xl p-5 sm:p-6 border"
                style={{
                    background: CHAR,
                    borderColor: CHAR,
                    boxShadow: '4px 4px 0 #1A1A1A',
                }}
            >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <span
                            className="text-[11px] uppercase tracking-wider font-semibold block mb-1"
                            style={{ fontFamily: MONO, color: '#888' }}
                        >
                            Today's takings
                        </span>
                        <span
                            className="text-4xl sm:text-5xl font-semibold leading-none"
                            style={{ fontFamily: MONO, color: '#FFF4DA' }}
                        >
                            {kes(todayTotal)}
                        </span>
                        <div className="mt-2">
                            <TrendBadge today={todayTotal} yesterday={yesterdayTotal} />
                        </div>
                    </div>
                    <div className="w-full sm:w-48 opacity-70">
                        <Sparkline color="#F2B84B" />
                    </div>
                </div>
            </div>

            {/* stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                    label="This week"
                    value={kes(weekTotal)}
                    icon={<TrendUpIcon />}
                />
                <StatCard
                    label="This month"
                    value={kes(monthTotal)}
                    icon={<TrendUpIcon />}
                />
                <StatCard
                    label="Receipts today"
                    value={String(txnCount)}
                    icon={<ReceiptIcon />}
                />
                <StatCard
                    label="Average sale"
                    value={kes(avgSale)}
                    icon={<AverageIcon />}
                />
            </div>

            {/* flagged alert — only shown when > 0 */}
            {flagged > 0 && (
                <div
                    className="flex items-start gap-3 rounded-2xl px-4 py-3.5 border"
                    style={{ background: '#FEF2F2', borderColor: TOMATO }}
                >
                    <span style={{ color: TOMATO, marginTop: 2 }}><AlertIcon /></span>
                    <div>
                        <p className="font-bold text-sm" style={{ color: TOMATO, fontFamily: DISPLAY }}>
                            {flagged} duplicate receipt{flagged > 1 ? 's' : ''} flagged
                        </p>
                        <p className="text-[13px] mt-0.5" style={{ fontFamily: MONO, color: '#B45454' }}>
                            These callbacks were blocked and your total is unaffected.
                            Review below if needed.
                        </p>
                    </div>
                </div>
            )}

            {/* recent transactions */}
            <div>
                <h2 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold text-xl mb-3">
                    Today's receipts
                </h2>
                <TransactionTable />
            </div>
        </div>
    );
}

// ─── page component ──────────────────────────────────────────────────────────
export default function Dashboard(props: DashboardProps) {
    const { shop, transactions, staff, isOwner } = props;
    const [tab, setTab] = useState<TabKey>('overview');

    return (
        <>
            <Seo
                title="Dashboard"
                description="Your daily M-Pesa reconciliation dashboard."
                noindex
            />

            <div
                className="min-h-screen antialiased"
                style={{ background: CREAM, color: CHAR, fontFamily: '"Nunito", ui-sans-serif, sans-serif' }}
            >
                <TopBar shop={shop} />
                <TabNav active={tab} onChange={setTab} isOwner={isOwner} />

                <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-16">

                    {tab === 'overview' && <OverviewTab {...props} />}

                    {tab === 'transactions' && (
                        <div>
                            <h2 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold text-xl mb-4">
                                All receipts today
                            </h2>
                            <TransactionTable transactions={transactions} />
                        </div>
                    )}

                    {tab === 'staff' && isOwner && (
                        <div>
                            <h2 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold text-xl mb-4">
                                Staff
                            </h2>
                            <StaffPanel staff={staff} />
                        </div>
                    )}

                    {tab === 'shop' && (
                        <div>
                            <h2 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold text-xl mb-4">
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