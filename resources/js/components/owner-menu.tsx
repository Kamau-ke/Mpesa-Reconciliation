import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type OwnerMenuProps = {
    owner: Owner;
};

export default function OwnerMenu({ auth }: OwnerMenuProps) {

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            ref={menuRef}
            className="relative border-t border-[#353538] p-5"
        >

            {/* Dropdown */}
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

            {/* Trigger */}
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

                    <p className="text-xs text-[#A7A7AB]">
                        {auth.user.role}
                    </p>
                </div>

                <span className="shrink-0 text-[#A7A7AB]">
                    ⋮
                </span>

            </button>

        </div>
    );
}