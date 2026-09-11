import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import ShopController from '@/actions/App/Http/Controllers/ShopController';
// import type { Shop } from '@/types'

type ShopNavDropdownProps = {
    shops: Shop[];
    activeShopId: number | null;
};

export default function ShopNavDropdown({ shops, activeShopId }: ShopNavDropdownProps) {
    const [open, setOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeShop = shops.find((s) => s.id === activeShopId);

    function switchShop(shopId: number) {
        setOpen(false);
        router.get(
            '/owner/dashboard',
            { shop_id: shopId },
            { preserveState: true, preserveScroll: true },
        );
    }
     
    return (
        <div ref={dropdownRef} className="relative mb-1">

        

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev )}
                className={[
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                    open
                        ? 'bg-[#242426] text-[#F5F5F5]'
                        : 'text-[#F5F5F5] hover:bg-[#242426]',
                ].join(' ')}
            >
                
                <span className="truncate">
                    {activeShop ? activeShop.name : 'Shops'}
                </span>

                <span
                    className={`shrink-0 text-xs text-[#A7A7AB] transition-transform ${open ? 'rotate-180' : ''}`}
                >
                    ▾
                </span>
            </button>

            

            {open && (
                <div className="mt-1 space-y-0.5 pl-2">
                    
                    {shops.length === 0 && (
                        <p className="px-3 py-2 text-xs text-[#A7A7AB]">
                            No shops yet
                        </p>
                    )}

                    {shops.map((shop) => {
  

                return (
                    <Link
                            key={shop.id}
                            href={ShopController.show(shop.id)}
                            onClick={() => setOpen(false)}
                            className={[
                                'block w-full rounded-lg px-3 py-2 text-left text-sm transition',
                                shop.id === activeShopId
                                    ? 'bg-[#43B47E]/15 text-[#5FD69B]'
                                    : 'text-[#A7A7AB] hover:bg-[#242426] hover:text-[#F5F5F5]',
                            ].join(' ')}
                        >
                            {shop.name}
                    </Link>
                    );
                })}

                    <Link
                        href="/owner/shop"
                        className="block rounded-lg px-3 py-2 text-sm text-[#A7A7AB] hover:bg-[#242426] hover:text-[#F5F5F5]"
                        onClick={() => setOpen(false)}
                    >
                        Manage shops
                    </Link>
                </div>
            )}

        </div>
    );
}