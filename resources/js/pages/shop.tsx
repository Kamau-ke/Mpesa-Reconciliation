import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useRef, useState } from 'react';

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type AuthUser = {
    id: number;
    name: string;
    email: string;
};

type PageProps = {
    auth: {
        user: AuthUser;
    };
};

type Shop = {
    id: number;
    name: string;
    till_number: string;
    business_type: string;
    location: string;
    phone: string;
    email: string | null;
    address: string | null;
};

interface ShopPageProps {
    shop: Shop;
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getInitials(name: string) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function handleLogout() {
    router.post('/logout');
}

export default function Shop({ shop }: ShopPageProps) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            name: shop.name ?? '',
            till_number: shop.till_number ?? '',
            business_type: shop.business_type ?? '',
            location: shop.location ?? '',
            phone: shop.phone ?? '',
            email: shop.email ?? '',
            address: shop.address ?? '',
        });

    function submit(e: FormEvent) {
        e.preventDefault();
        patch('/owner/shop');
    }

    return (
        <>
            <Head title="Shop" />

            <div className="min-h-screen bg-[#101010] text-[#F5F5F5] [font-family:'Inter',ui-sans-serif,sans-serif]">
                <div className="flex min-h-screen">
                    {/* ======================================================
                        SIDEBAR
                    ====================================================== */}

                    <aside className="hidden w-64 shrink-0 border-r border-[#353538] bg-[#1B1B1D] lg:flex lg:flex-col">
                        {/* Logo */}
                        <div className="px-6 pb-8 pt-7">
                            <div
                                className="text-2xl font-bold tracking-tight text-[#F5F5F5]"
                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                            >
                                kadogo
                            </div>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A7A7AB]">
                                M-Pesa Reconciliation
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4">
                            <NavItem label="Dashboard" href="/owner/dashboard" />
                            <NavItem label="Transactions" href="/owner/transactions" />
                            <NavItem label="Reconciliation" href="/owner/reconciliation" />

                            <div className="pb-2 pt-7">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                                    Shop
                                </p>
                            </div>

                            <NavItem label="Shop" href="/owner/shop" active />
                            <NavItem label="Profile" href="/owner/profile" />

                            <div className="pb-2 pt-7">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                                    Management
                                </p>
                            </div>

                            <NavItem label="Employees" href="/owner/employees" />
                            <NavItem label="Tills" href="/owner/tills" />
                        </nav>

                        {/* Owner */}
                        <OwnerMenu auth={auth} />
                    </aside>

                    {/* ======================================================
                        MAIN
                    ====================================================== */}

                    <main className="min-w-0 flex-1">
                        {/* Header */}
                        <header className="border-b border-[#353538] bg-[#1B1B1D] px-5 py-5 sm:px-6 lg:px-10">
                            <div className="flex items-center justify-between gap-5">
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-[#A7A7AB]">
                                        {shop.name}
                                    </p>

                                    <h1
                                        className="mt-1 text-xl font-bold tracking-tight text-[#F5F5F5] sm:text-2xl"
                                        style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                    >
                                        Shop profile
                                    </h1>

                                    <p className="mt-1 hidden text-sm text-[#A7A7AB] sm:block">
                                        Update your business details and till information.
                                    </p>
                                </div>

                                <Link
                                    href="/owner/dashboard"
                                    className="hidden shrink-0 rounded-xl border border-[#353538] px-4 py-2.5 text-sm font-bold text-[#F5F5F5] transition hover:border-[#43B47E] hover:text-[#43B47E] sm:block"
                                >
                                    Back to dashboard
                                </Link>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="p-5 sm:p-6 lg:p-10">
                            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                                {/* ==================================================
                                    SHOP DETAILS FORM
                                ================================================== */}

                                <section className="min-w-0 rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5 sm:p-6">
                                    <div>
                                        <h2
                                            className="font-bold text-[#F5F5F5]"
                                            style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                        >
                                            Business information
                                        </h2>

                                        <p className="mt-1 text-xs text-[#A7A7AB]">
                                            This appears on receipts and reconciliation reports.
                                        </p>
                                    </div>

                                    <form onSubmit={submit} className="mt-6 space-y-5">
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field
                                                label="Business name"
                                                value={data.name}
                                                onChange={(v) => setData('name', v)}
                                                error={errors.name}
                                                placeholder="Kadogo Shop"
                                            />

                                            <Field
                                                label="Till number"
                                                value={data.till_number}
                                                onChange={(v) => setData('till_number', v)}
                                                error={errors.till_number}
                                                placeholder="123456"
                                                mono
                                            />

                                            <Field
                                                label="Business type"
                                                value={data.business_type}
                                                onChange={(v) => setData('business_type', v)}
                                                error={errors.business_type}
                                                placeholder="General shop"
                                            />

                                            <Field
                                                label="Location"
                                                value={data.location}
                                                onChange={(v) => setData('location', v)}
                                                error={errors.location}
                                                placeholder="Nyeri, Kenya"
                                            />

                                            <Field
                                                label="Phone"
                                                value={data.phone}
                                                onChange={(v) => setData('phone', v)}
                                                error={errors.phone}
                                                placeholder="0712 456 789"
                                            />

                                            <Field
                                                label="Email"
                                                value={data.email}
                                                onChange={(v) => setData('email', v)}
                                                error={errors.email}
                                                placeholder="shop@example.com"
                                                type="email"
                                            />
                                        </div>

                                        <Field
                                            label="Address"
                                            value={data.address}
                                            onChange={(v) => setData('address', v)}
                                            error={errors.address}
                                            placeholder="Street, building, town"
                                            textarea
                                        />

                                        <div className="flex items-center gap-4 pt-2">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-xl bg-[#43B47E] px-5 py-3 text-sm font-bold text-[#101010] transition hover:bg-[#57C68E] disabled:opacity-60"
                                                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                            >
                                                {processing ? 'Saving...' : 'Save changes'}
                                            </button>

                                            {recentlySuccessful && (
                                                <span className="text-xs font-semibold text-[#43B47E]">
                                                    Saved
                                                </span>
                                            )}
                                        </div>
                                    </form>
                                </section>

                                {/* ==================================================
                                    SIDE SUMMARY
                                ================================================== */}

                                <div className="space-y-6">
                                    <section className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">
                                        <h2
                                            className="font-bold text-[#F5F5F5]"
                                            style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                        >
                                            Current details
                                        </h2>

                                        <div className="mt-5 space-y-4">
                                            <InfoItem label="Business" value={shop.name} />
                                            <InfoItem label="Till" value={shop.till_number} mono />
                                            <InfoItem label="Type" value={shop.business_type || '—'} />
                                            <InfoItem label="Location" value={shop.location} />
                                            <InfoItem label="Phone" value={shop.phone} />
                                        </div>
                                    </section>

                                    <section className="rounded-2xl border border-[#353538] bg-[#1B1B1D] p-5">
                                        <h2
                                            className="font-bold text-[#F5F5F5]"
                                            style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                                        >
                                            Manage tills
                                        </h2>

                                        <p className="mt-1 text-xs text-[#A7A7AB]">
                                            Add or remove till numbers linked to this shop.
                                        </p>

                                        <Link
                                            href="/owner/tills"
                                            className="mt-5 block rounded-xl border border-[#353538] px-4 py-3 text-center text-sm font-bold text-[#F5F5F5] transition hover:border-[#43B47E] hover:text-[#43B47E]"
                                        >
                                            Go to tills
                                        </Link>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

/*
|--------------------------------------------------------------------------
| Navigation Item
|--------------------------------------------------------------------------
*/

type NavItemProps = {
    label: string;
    href: string;
    active?: boolean;
};

function NavItem({ label, href, active = false }: NavItemProps) {
    return (
        <Link
            href={href}
            className={[
                'mb-1 block rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                active
                    ? 'bg-[#43B47E] text-[#101010]'
                    : 'text-[#F5F5F5] hover:bg-[#242426]',
            ].join(' ')}
        >
            {label}
        </Link>
    );
}

/*
|--------------------------------------------------------------------------
| Owner Menu
|--------------------------------------------------------------------------
*/

type OwnerMenuProps = {
    auth: PageProps['auth'];
};

function OwnerMenu({ auth }: OwnerMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative border-t border-[#353538] p-5">
            {open && (
                <div className="absolute bottom-full left-5 right-5 mb-2 overflow-hidden rounded-xl border border-[#353538] bg-[#242426] shadow-lg">
                    <Link
                        href="/owner/profile"
                        className="block px-4 py-3 text-sm font-semibold text-[#F5F5F5] hover:bg-[#2A2A2D]"
                        onClick={() => setOpen(false)}
                    >
                        View profile
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-3 text-left text-sm font-semibold text-[#FF6B6B] hover:bg-[#2A2A2D]"
                    >
                        Logout
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left transition hover:bg-[#242426]"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#43B47E] text-sm font-bold text-[#101010]">
                    {getInitials(auth.user.name)}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#F5F5F5]">
                        {auth.user.name}
                    </p>

                    <p className="text-xs text-[#A7A7AB]">Owner</p>
                </div>

                <span className="shrink-0 text-[#A7A7AB]">⋮</span>
            </button>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Field
|--------------------------------------------------------------------------
*/

type FieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    mono?: boolean;
    textarea?: boolean;
};

function Field({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    mono = false,
    textarea = false,
}: FieldProps) {
    const baseClass = [
        'mt-2 w-full rounded-xl border bg-[#242426] px-4 py-3 text-sm text-[#F5F5F5]',
        'placeholder:text-[#6B6B6E] outline-none transition',
        'focus:border-[#43B47E]',
        error ? 'border-[#FF6B6B]' : 'border-[#353538]',
        mono ? 'font-mono' : '',
    ].join(' ');

    return (
        <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB]">
                {label}
            </label>

            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className={baseClass}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={baseClass}
                />
            )}

            {error && (
                <p className="mt-1.5 text-xs font-semibold text-[#FF6B6B]">{error}</p>
            )}
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Info Item
|--------------------------------------------------------------------------
*/

type InfoItemProps = {
    label: string;
    value: string;
    mono?: boolean;
};

function InfoItem({ label, value, mono = false }: InfoItemProps) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#A7A7AB]">
                {label}
            </p>

            <p
                className={[
                    'mt-1 text-sm font-semibold text-[#F5F5F5]',
                    mono ? 'font-mono' : '',
                ].join(' ')}
            >
                {value}
            </p>
        </div>
    );
}