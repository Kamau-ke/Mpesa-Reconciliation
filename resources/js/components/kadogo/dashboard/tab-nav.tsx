// resources/js/components/kadogo/dashboard/tab-nav.tsx

import type { TabKey } from '@/types/dashboard';

const CREAM   = '#FFF4DA';
const CHAR    = '#2B2B2B';
const AVOCADO = '#4E7D67';
const MUTED   = '#8A8578';
const DISPLAY = '"Baloo 2", ui-rounded, sans-serif';

function OverviewIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
    );
}
function TxnIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/>
        </svg>
    );
}
function StaffIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="7" r="3"/><path d="M2 20c0-3.3 3-5 7-5s7 1.7 7 5"/>
            <circle cx="18" cy="8" r="2.5"/><path d="M16 20c0-2 1.5-4 4-4"/>
        </svg>
    );
}
function ShopIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    );
}

type Tab = { key: TabKey; label: string; icon: () => JSX.Element };

const ALL_TABS: Tab[] = [
    { key: 'overview',      label: 'Overview',      icon: OverviewIcon },
    { key: 'transactions',  label: 'Transactions',  icon: TxnIcon },
    { key: 'staff',         label: 'Staff',         icon: StaffIcon },
    { key: 'shop',          label: 'Shop',          icon: ShopIcon },
];

type Props = {
    active: TabKey;
    onChange: (t: TabKey) => void;
    isOwner: boolean;
};

export default function TabNav({ active, onChange, isOwner }: Props) {
    const tabs = ALL_TABS.filter((t) => t.key !== 'staff' || isOwner);

    return (
        <nav
            className="sticky top-14 z-10 flex border-b overflow-x-auto scrollbar-none"
            style={{ background: CREAM, borderColor: '#E6DAB8' }}
            aria-label="Dashboard sections"
        >
            {tabs.map(({ key, label, icon: Icon }) => {
                const isActive = active === key;
                return (
                    <button
                        key={key}
                        onClick={() => onChange(key)}
                        className="flex items-center gap-2 px-4 sm:px-5 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors min-h-11 shrink-0"
                        style={{
                            fontFamily: DISPLAY,
                            color: isActive ? CHAR : MUTED,
                            borderBottomColor: isActive ? AVOCADO : 'transparent',
                            background: 'transparent',
                        }}
                        aria-current={isActive ? 'page' : undefined}
                    >
                        <Icon />
                        {label}
                    </button>
                );
            })}
        </nav>
    );
}