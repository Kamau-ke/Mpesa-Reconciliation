// resources/js/components/kadogo/dashboard/stat-card.tsx

import type { ReactNode } from 'react';

const CHAR    = '#2B2B2B';
const CREAM   = '#FFF4DA';
const MUTED   = '#8A8578';
const MONO    = '"IBM Plex Mono", ui-monospace, monospace';
const DISPLAY = '"Baloo 2", ui-rounded, sans-serif';

type Props = {
    label: string;
    value: string;
    sub?: string;
    accent?: string;  // value text colour — defaults to char
    icon?: ReactNode;
};

export default function StatCard({ label, value, sub, accent = CHAR, icon }: Props) {
    return (
        <div
            className="rounded-2xl px-5 py-4 flex flex-col gap-1"
            style={{
                background: CREAM,
                border: `2px solid ${CHAR}`,
                boxShadow: '3px 3px 0 #2B2B2B',
            }}
        >
            <div className="flex items-center justify-between gap-2">
                <span
                    className="text-[11px] uppercase tracking-wider font-semibold"
                    style={{ fontFamily: MONO, color: MUTED }}
                >
                    {label}
                </span>
                {icon && <span style={{ color: MUTED }}>{icon}</span>}
            </div>
            <span
                className="text-2xl font-semibold leading-tight"
                style={{ fontFamily: MONO, color: accent }}
            >
                {value}
            </span>
            {sub && (
                <span className="text-[12px]" style={{ fontFamily: MONO, color: MUTED }}>
                    {sub}
                </span>
            )}
        </div>
    );
}