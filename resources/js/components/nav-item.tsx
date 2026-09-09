import { Head, Link, router, usePage } from '@inertiajs/react';

type NavItemProps = {
    label: string;
    href: string;
    active?: boolean;
};

export default function NavItem({
    label,
    href,
    active = false,
}: NavItemProps) {
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