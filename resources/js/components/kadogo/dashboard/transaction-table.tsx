// resources/js/components/kadogo/dashboard/transaction-table.tsx

import { useState } from 'react';
import { K } from '@/lib/kadogo-token';
import type { Transaction } from '@/types/dashboard';

function kes(n: number) {
    return `KES ${n.toLocaleString('en-KE')}`;
}

function SearchIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    );
}

function StatusPill({ status }: { status: Transaction['status'] }) {
    const paid = status === 'paid';
    return (
        <span
            className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full"
            style={{
                fontFamily: K.mono,
                background: paid ? K.paidBg : K.dupPill,
                color: paid ? K.paidC : K.dupC,
            }}
        >
            {paid ? 'Paid' : 'Duplicate?'}
        </span>
    );
}

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? transactions.filter(
              (t) =>
                  t.payer.toLowerCase().includes(query.toLowerCase()) ||
                  t.id.toLowerCase().includes(query.toLowerCase()),
          )
        : transactions;

    return (
        <div className="flex flex-col gap-4">
            {/* search */}
            <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl max-w-xs"
                style={{ background: K.card }}
            >
                <span style={{ color: K.muted }}><SearchIcon /></span>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search payer or receipt"
                    className="bg-transparent text-[13px] outline-none w-full"
                    style={{ fontFamily: K.mono, color: K.ink }}
                    aria-label="Search transactions"
                />
            </div>

            {/* table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: K.card }}>
                {/* header */}
                <div
                    className="hidden sm:grid grid-cols-[56px_1fr_108px_92px] gap-4 px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold"
                    style={{ background: K.cardAlt, color: K.mutedDk, fontFamily: K.mono }}
                >
                    <span>Time</span>
                    <span>Payer</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Status</span>
                </div>

                {filtered.length === 0 && (
                    <div className="px-5 py-14 text-center">
                        <p style={{ fontFamily: K.display, color: K.ink }} className="font-bold text-lg">
                            {transactions.length === 0
                                ? 'No sales yet today.'
                                : `No receipts match "${query}".`}
                        </p>
                        <p style={{ fontFamily: K.mono, color: K.muted }} className="text-[13px] mt-1">
                            {transactions.length === 0
                                ? 'Your first receipt will appear here the moment it arrives.'
                                : 'Try a different name or receipt number.'}
                        </p>
                    </div>
                )}

                {filtered.map((t, i) => (
                    <div
                        key={`${t.id}-${i}`}
                        className="grid grid-cols-2 sm:grid-cols-[56px_1fr_108px_92px] gap-x-4 gap-y-0.5 px-5 py-3"
                        style={{
                            background:
                                t.status === 'flagged'
                                    ? K.dupBg
                                    : i % 2 !== 0
                                    ? K.cardAlt
                                    : K.card,
                        }}
                    >
                        <span style={{ fontFamily: K.mono, color: K.muted }} className="text-[12px] self-center">
                            {t.time}
                        </span>
                        <span
                            style={{ color: K.ink }}
                            className="text-[13px] font-bold self-center col-span-2 sm:col-auto order-first sm:order-none truncate"
                        >
                            {t.payer}
                        </span>
                        <span
                            style={{ fontFamily: K.mono, color: K.ink }}
                            className="text-[13px] font-bold self-center sm:text-right"
                        >
                            +{kes(t.amount)}
                        </span>
                        <span className="self-center sm:text-right">
                            <StatusPill status={t.status} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}