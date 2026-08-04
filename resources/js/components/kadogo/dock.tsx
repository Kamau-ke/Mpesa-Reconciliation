import { Link } from '@inertiajs/react';
import { dashboard, login } from '@/routes';

const CHAR = '#2B2B2B';
const CREAM = '#FFF4DA';
const MANGO = '#F2B84B';

type Props = {
    isAuthenticated: boolean;
};

function HomeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
        </svg>
    );
}

function SparkleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3v4M12 17v4M4 12h4M16 12h4" />
            <path d="M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
        </svg>
    );
}

function ReceiptIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="9" y1="12" x2="15" y2="12" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M10 8l4 4-4 4" />
        </svg>
    );
}

export default function Dock({ isAuthenticated }: Props) {
    return (
        <nav
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 sm:px-3 py-2 rounded-full"
            style={{ background: CHAR, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
            aria-label="Primary navigation"
        >
            <a
                href="#top"
                className="flex items-center gap-2 min-w-11 min-h-11 justify-center px-2.5 sm:px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: CREAM }}
            >
                <HomeIcon />
                <span className="hidden sm:inline text-sm">Home</span>
                <span className="sr-only">Home</span>
            </a>

            <a

            
            
                href="#features"
                className="flex items-center gap-2 min-w-11 min-h-11 justify-center px-2.5 sm:px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: CREAM }}
            >
                <SparkleIcon />
                <span className="hidden sm:inline text-sm">Features</span>
                <span className="sr-only">Features</span>
            </a>

            <a
                href="#stall"
                className="flex items-center gap-2 min-w-11 min-h-11 justify-center px-2.5 sm:px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: CREAM }}
            >
                <ReceiptIcon />
                <span className="hidden sm:inline text-sm">Live stall</span>
                <span className="sr-only">Live stall</span>
            </a>

            <Link
                href={isAuthenticated ? dashboard() : login()}
                className="flex items-center gap-2 min-w-11 min-h-11 justify-center px-3 sm:px-4 py-2 rounded-full font-bold text-sm"
                style={{
                    background: MANGO,
                    color: CHAR,
                    fontFamily: '"Baloo 2", ui-rounded, sans-serif',
                }}
            >
                <ArrowIcon />
                <span className="hidden sm:inline">{isAuthenticated ? 'Dashboard' : 'Log in'}</span>
                <span className="sr-only">{isAuthenticated ? 'Dashboard' : 'Log in'}</span>
            </Link>
        </nav>
    );
}