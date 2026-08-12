// resources/js/components/kadogo/dashboard/top-bar.tsx

import { Link, usePage } from '@inertiajs/react';
import { useAuth } from '@/hooks/use-auth';
import { useMemo } from 'react';
import { logout } from '@/routes';
import type { Shop } from '@/types/dashboard';

const CHAR    = '#2B2B2B';
const CREAM   = '#FFF4DA';
const AVOCADO = '#4E7D67';
const TOMATO  = '#E85D5D';
const MONO    = '"IBM Plex Mono", ui-monospace, monospace';
const DISPLAY = '"Baloo 2", ui-rounded, sans-serif';

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

function LogOutIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

type Props = {
    shop: Shop | null;
};

 

export default function TopBar({ shop }: Props) {
    const { auth } = usePage().props;
    const {user}=useAuth();
    const owner=user.name;
    const today = useMemo(
        () => new Date().toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short' }),
        [],
    );

    return (
        <header
            className="h-14 flex items-center px-4 sm:px-6 sticky top-0 z-20 border-b"
            style={{ background: CHAR, borderColor: '#3D3D3D' }}
        >
            {/* Left: wordmark + shop name */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <span style={{ fontFamily: DISPLAY, color: CREAM }} className="font-bold text-base shrink-0">
                    Kadogo
                </span>
                {shop && (
                    <>
                        <span style={{ color: '#666' }} className="hidden sm:inline">/</span>
                        <span
                            style={{ fontFamily: MONO, color: '#B8B2A0' }}
                            className="hidden sm:inline text-[13px] truncate"
                        >
                            {shop.name}
                        </span>
                    </>
                )}
            </div>

            {/* Centre: date */}
            <span
                style={{ fontFamily: MONO, color: '#666' }}
                className="hidden md:block text-[12px] absolute left-1/2 -translate-x-1/2"
            >
                {today}
            </span>
            
            {/* Right: role pill + avatar + logout */}
            <div className="flex items-center gap-3 shrink-0">
                <span
                    className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                    style={{
                        fontFamily: MONO,
                        background: owner=== auth.name ? AVOCADO : '#3D3D3D',
                        color: CREAM,
                    }}
                >
                    {user.role}
                </span>

                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                    style={{ background: TOMATO, color: CREAM, fontFamily: MONO }}
                    title={owner}
                    aria-label={`Logged in as ${owner}`}
                >
                    {initials(owner)}
                </div>

                <Link
                    href={logout()}
                    as="button"
                    method="post"
                    className="flex items-center gap-1.5 min-h-11 px-1 rounded transition-opacity hover:opacity-70"
                    style={{ color: '#888' }}
                    title="Log out"
                    aria-label="Log out"
                >
                    <LogOutIcon />
                    <span style={{ fontFamily: MONO }} className="hidden lg:inline text-[12px]">
                        Log out
                    </span>
                </Link>
            </div>
        </header>
    );
}