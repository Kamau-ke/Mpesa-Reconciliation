import { Link, usePage } from '@inertiajs/react';
import { Clock, LayoutGrid, Receipt, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Fixed bottom tab bar for the staff-facing mobile app.
 *
 * Staff only ever need a handful of destinations, so this stays a simple
 * fixed 4-tab bar rather than a full sidebar (that's reserved for the
 * owner's desktop-oriented dashboard). Active state is derived from the
 * current Inertia URL so it stays correct across client-side navigation
 * without any extra prop plumbing per page.
 */

type NavTab = {
    title: string;
    href: string;
    icon: LucideIcon;
};

const TABS: NavTab[] = [
    { title: 'Today', href: '/dashboard/staff', icon: LayoutGrid },
    { title: 'Transactions', href: '/transactions', icon: Receipt },
    { title: 'Shifts', href: '/shifts', icon: Clock },
    { title: 'Account', href: '/settings/profile', icon: UserRound },
];

export function StaffBottomNav() {
    const currentUrl = usePage().url;

    return (
        <nav
            className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="mx-auto flex max-w-md items-stretch justify-around sm:max-w-2xl lg:max-w-6xl">
                {TABS.map((tab) => {
                    const isActive =
                        currentUrl === tab.href || currentUrl.startsWith(`${tab.href}/`);
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
                        >
                            <Icon
                                className={`size-5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`}
                            />
                            <span className={isActive ? 'text-emerald-400' : 'text-zinc-500'}>
                                {tab.title}
                            </span>
                            {isActive && (
                                <span className="absolute top-0 h-0.5 w-8 -translate-y-px rounded-full bg-emerald-400" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}