import { Link, usePage } from '@inertiajs/react';
import Seo from '@/components/kadogo/seo';
import CoinDoodle from '@/components/kadogo/coin-doodle';
import ScallopDivider from '@/components/kadogo/scallop-divider';
import StallCard from '@/components/kadogo/stall-card';
import Dock from '@/components/kadogo/dock';
import { dashboard, register } from '@/routes';

const CREAM = '#F5F5F5';
const CHAR = '#101010';
const AVOCADO = '#43B47E';
const TOMATO = '#D65A5A';
const MANGO = '#D9B75A';

const display = { fontFamily: '"Baloo 2", ui-rounded, sans-serif' };

type SeoData = {
    title: string;
    description: string;
    canonical: string;
    image: string;
};

type WelcomeProps = {
    seo: SeoData;
};

const CashIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const PhoneIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <line x1="10" y1="19" x2="14" y2="19" />
    </svg>
);

const PeopleIcon = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3-5 7-5s7 1.7 7 5" />
        <circle cx="18" cy="9" r="2.5" />
        <path d="M16 20c0-2 1.5-4 4-4" />
    </svg>
);

function Hero({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <section id="top" className="max-w-5xl mx-auto px-6 pt-16 pb-28 md:pt-24 relative">
            <div className="absolute top-10 right-6 md:right-16 hidden sm:block motion-safe:animate-spin-slow">
                <CoinDoodle className="w-14 h-14" />
            </div>
            <div
                className="absolute top-40 right-2 w-8 h-8 rounded-full hidden md:block"
                style={{ background: TOMATO, border: `2px solid ${CHAR}` }}
                aria-hidden="true"
            />

            <div className="text-center">
                <span
                    className="inline-block font-bold text-sm px-4 py-1.5 rounded-full mb-6"
                    style={{ background: AVOCADO, color: CREAM, ...display, transform: 'rotate(-2deg)' }}
                >
                    Built for kiosks &amp; small shops
                </span>

                <h1 style={display} className="font-extrabold text-5xl md:text-7xl leading-[0.95]">
                    Count your coins,
                    <br />
                    <span style={{ color: TOMATO }}>not your worries.</span>
                </h1>

                <p className="max-w-md mx-auto mt-6 text-lg opacity-80">
                    Kadogo watches your till so you don&apos;t have to squint at M-Pesa SMS at midnight.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <Link
                        href={isAuthenticated ? dashboard() : register()}
                        style={{ ...display, background: CREAM, borderColor: CHAR }}
                        className="font-bold inline-block px-8 py-4 rounded-full border-[3px] border-dashed hover:scale-[1.04] hover:rotate-0 transition-transform"
                    >
                        {isAuthenticated ? 'Open dashboard' : 'Start free today'}
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" className="py-20 px-6" style={{ background: CHAR }}>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                <StallCard
                    icon={CashIcon}
                    title="No double counting"
                    body="Every receipt is checked before it joins your total. Retried callbacks don't fool us — and never inflate your day."
                    bg={MANGO}
                    rotate={-2}
                />
                <StallCard
                    icon={PhoneIcon}
                    title="Thumb-friendly"
                    body="Built for one hand, mid-shift, between customers — no zooming, no squinting."
                    bg={TOMATO}
                    color={CREAM}
                    rotate={1.5}
                    delay={0.1}
                />
                <StallCard
                    icon={PeopleIcon}
                    title="Know who's on till"
                    body="Add staff in seconds. Pull access the moment they clock out — checked on the server, every time."
                    bg={AVOCADO}
                    color={CREAM}
                    rotate={-1}
                    delay={0.2}
                />
            </div>
        </section>
    );
}

function StallPreview() {
    return (
        <section id="stall" className="py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 style={display} className="font-extrabold text-3xl md:text-4xl mb-2">
                    Today&apos;s stall total
                </h2>
                <p className="opacity-70 mb-8">Updated the moment a customer pays</p>
                <div
                    className="inline-block rounded-3xl px-12 py-10"
                    style={{
                        background: CREAM,
                        border: `3px solid ${CHAR}`,
                        boxShadow: `4px 4px 0 ${CHAR}`,
                        transform: 'rotate(-1deg)',
                    }}
                >
                    <span style={{ ...display, color: TOMATO }} className="font-extrabold text-5xl md:text-6xl">
                        KES 42,318
                    </span>
                    <p className="mt-3 text-sm opacity-70">47 receipts reconciled today, no duplicates.</p>
                </div>
            </div>
        </section>
    );
}

function Cta({ isAuthenticated }: { isAuthenticated: boolean }) {
    if (isAuthenticated) return null;

    return (
        <section className="py-24 px-6 text-center" style={{ background: AVOCADO, color: CREAM }}>
            <h2 style={display} className="font-extrabold text-3xl md:text-5xl mb-4">
                Ready to join the market?
            </h2>
            <p className="opacity-90 mb-8">Free while you&apos;re getting started — no card, no fuss.</p>
            <Link
                href={register()}
                style={{ ...display, background: CREAM, borderColor: CHAR, color: CHAR }}
                className="font-bold inline-block px-8 py-4 rounded-full border-[3px] border-dashed hover:scale-[1.04] hover:rotate-0 transition-transform"
            >
                Sign up free
            </Link>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-10 text-center pb-32" style={{ background: CHAR, color: CREAM }}>
            <span style={display} className="font-bold text-lg">
                Kadogo
            </span>
            <p className="text-xs opacity-60 mt-1">Small coins, big peace of mind.</p>
        </footer>
    );
}

export default function Welcome({ seo }: WelcomeProps) {
    const { auth } = usePage().props;
    const isAuthenticated = Boolean(auth.user);

    return (
        <>
            <Seo
                title={seo.title}
                description={seo.description}
                canonical={seo.canonical}
                image={seo.image}
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareApplication',
                    name: 'Kadogo',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'Web',
                    description: seo.description,
                    offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'KES',
                    },
                }}
            />

            <div
                style={{ background: CREAM, color: CHAR }}
                className="min-h-screen antialiased overflow-x-hidden font-sans"
            >
                <style>{`
                    @keyframes riseIn {
                        from { opacity: 0; transform: translateY(20px) scale(0.96); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .animate-spin-slow {
                        animation: spin 6s linear infinite;
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        *, .animate-spin-slow {
                            animation-duration: 0.001ms !important;
                            animation-iteration-count: 1 !important;
                        }
                    }
                `}</style>

                <Hero isAuthenticated={isAuthenticated} />
                <ScallopDivider />
                <Features />
                <StallPreview />
                <Cta isAuthenticated={isAuthenticated} />
                <Footer />
                <Dock isAuthenticated={isAuthenticated} />
            </div>
        </>
    );
}
