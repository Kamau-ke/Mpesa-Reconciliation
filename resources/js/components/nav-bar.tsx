import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import NavItem from './nav-item';
import ShopNavDropdown from './ShopNavDropdown';
import { getInitials } from '@/utils';
import { dashboard, showTransactions } from '@/routes';

interface Shop {
  id: number;
  name: string;
}

interface NavBarProps {
  shops: Shop[];
  activeShopId: number;
  showTransactionsTab?: boolean;
}

export default function NavBar({ shops, activeShopId, showTransactionsTab = false }: NavBarProps) {
    const { url } = usePage();


    const transactionsHref = showTransactionsTab && activeShopId
        ? showTransactions(activeShopId).url
        : undefined;
   

    return (
        <aside className="hidden w-64 shrink-0 border-r border-[#353538] bg-[#1B1B1D] lg:flex lg:flex-col">

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

            <nav className="flex-1 px-4">

                <NavItem
                    label="Dashboard"
                    href={dashboard()}
                    active={url === dashboard().url}
                />

                {showTransactionsTab && transactionsHref && (
                    <NavItem
                        label="Transactions"
                        href={transactionsHref}
                        active={url === transactionsHref}
                    />
                )}

                <NavItem
                    label="Reconciliation"
                    href="/owner/reconciliation"
                    active={url === '/owner/reconciliation'}
                />

                <ShopNavDropdown shops={shops} activeShopId={activeShopId} />

                <NavItem
                    label="Profile"
                    href="/owner/profile"
                    active={url === '/owner/profile'}
                />

                <div className="pb-2 pt-7">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                        Management
                    </p>
                </div>

                <NavItem
                    label="Employees"
                    href="/owner/employees"
                    active={url === '/owner/employees'}
                />

                <NavItem
                    label="Tills"
                    href="/owner/tills"
                    active={url === '/owner/tills'}
                />

            </nav>

            {/* Owner */}
            {/* <OwnerMenu auth={auth} /> */}

        </aside>
    );
}