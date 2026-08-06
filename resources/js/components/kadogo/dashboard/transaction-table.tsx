import { useMemo, useState } from 'react';
import type { Transaction } from '@/types/dashboard';

const CHAR = '#2B2B2B';
const CREAM = '#FFF4DA';
const AVOCADO = '#4E7D67';
const TOMATO = '#E85D5D';
const MUTED = '#8A8578';
const RULE = '#E6DAB8';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const DISPLAY = '"Baloo 2", ui-rounded, sans-serif';

function kes(n: number): string {
    return `KES ${n.toLocaleString('en-KE')}`;
}

function SearchIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function StatusPill({ status }: { status: Transaction['status'] }) {
    const isPaid = status === 'paid';

    return (
        <span
            className="inline-block text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full"
            style={{
                fontFamily: MONO,
                background: isPaid ? '#D4EDDA' : '#FDEAEA',
                color: isPaid ? AVOCADO : TOMATO,
            }}
        >
            {isPaid ? 'Paid' : 'Duplicate?'}
        </span>
    );
}

/**
 * Dummy transactions for development / demo
 */
const DUMMY_TRANSACTIONS: Transaction[] = [
    {
        id: 'RCP-001',
        payer: 'Mary Wanjiru',
        amount: 1250,
        time: '08:12',
        status: 'paid',
    },
    {
        id: 'RCP-002',
        payer: 'David Otieno',
        amount: 450,
        time: '09:05',
        status: 'paid',
    },
    {
        id: 'RCP-003',
        payer: 'Amina Hassan',
        amount: 3200,
        time: '10:18',
        status: 'paid',
    },
    {
        id: 'RCP-004',
        payer: 'John Kamau',
        amount: 800,
        time: '11:02',
        status: 'flagged',
    },
    {
        id: 'RCP-005',
        payer: 'Grace Njeri',
        amount: 1500,
        time: '12:44',
        status: 'paid',
    },
];

type Props = {
    transactions?: Transaction[];
};

export default function TransactionTable({
    transactions = DUMMY_TRANSACTIONS,
}: Props) {
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) return transactions;

        return transactions.filter(
            (t) =>
                t.payer.toLowerCase().includes(q) ||
                t.id.toLowerCase().includes(q),
        );
    }, [query, transactions]);

    return (
        <div className="flex flex-col gap-4">
            {/* search row */}
            <div className="flex items-center gap-3">
                <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1 max-w-xs"
                    style={{ background: CREAM, borderColor: RULE }}
                >
                    <span style={{ color: MUTED }}>
                        <SearchIcon />
                    </span>

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search payer or receipt"
                        className="bg-transparent text-[13px] outline-none w-full placeholder:opacity-50"
                        style={{ fontFamily: MONO, color: CHAR }}
                        aria-label="Search transactions"
                    />
                </div>

                <span
                    style={{ fontFamily: MONO, color: MUTED }}
                    className="text-[12px] shrink-0"
                >
                    {filtered.length} receipt{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* table */}
            <div
                className="rounded-2xl overflow-hidden border"
                style={{
                    borderColor: CHAR,
                    boxShadow: '3px 3px 0 #2B2B2B',
                }}
            >
                {/* header */}
                <div
                    className="hidden sm:grid grid-cols-[72px_1fr_1fr_110px_100px] gap-4 px-4 py-2.5 border-b text-[11px] uppercase tracking-wider font-semibold"
                    style={{
                        fontFamily: MONO,
                        color: MUTED,
                        background: '#F0EAD6',
                        borderColor: RULE,
                    }}
                >
                    <span>Time</span>
                    <span>Receipt ID</span>
                    <span>Payer</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Status</span>
                </div>

                {filtered.length === 0 && (
                    <div
                        className="px-4 py-14 text-center"
                        style={{ background: CREAM }}
                    >
                        <p
                            style={{ fontFamily: DISPLAY, color: CHAR }}
                            className="font-bold text-lg"
                        >
                            {transactions.length === 0
                                ? 'No sales yet today.'
                                : `No receipts match "${query}".`}
                        </p>

                        <p
                            style={{ fontFamily: MONO, color: MUTED }}
                            className="text-[13px] mt-1"
                        >
                            {transactions.length === 0
                                ? 'Your first receipt will appear here the moment it arrives.'
                                : 'Try a different name or receipt number.'}
                        </p>
                    </div>
                )}

                {filtered.map((t, i) => (
                    <div
                        key={t.id}
                        className="grid grid-cols-2 sm:grid-cols-[72px_1fr_1fr_110px_100px] gap-x-4 gap-y-0.5 px-4 py-3 border-b last:border-b-0"
                        style={{
                            background:
                                t.status === 'flagged'
                                    ? '#FEF2F2'
                                    : i % 2 === 0
                                      ? CREAM
                                      : '#FFFBF2',
                            borderColor: RULE,
                        }}
                    >
                        {/* time */}
                        <span
                            className="text-[13px] self-center"
                            style={{ fontFamily: MONO, color: MUTED }}
                        >
                            {t.time}
                        </span>

                        {/* receipt id */}
                        <span
                            className="text-[13px] self-center hidden sm:block truncate"
                            style={{ fontFamily: MONO, color: MUTED }}
                        >
                            {t.id}
                        </span>

                        {/* payer */}
                        <span
                            className="text-sm font-semibold self-center col-span-2 sm:col-auto order-first sm:order-none truncate"
                            style={{ color: CHAR }}
                        >
                            {t.payer}
                        </span>

                        {/* amount */}
                        <span
                            className="text-sm font-semibold self-center sm:text-right"
                            style={{ fontFamily: MONO, color: CHAR }}
                        >
                            +{kes(t.amount)}
                        </span>

                        {/* status */}
                        <span className="self-center sm:text-right">
                            <StatusPill status={t.status} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}