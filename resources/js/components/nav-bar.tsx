import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import NavItem from './nav-item';
import ShopNavDropdown from './ShopNavDropdown';


export default function NavBar(){
    <>
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

                            <NavItem
                                label="Dashboard"
                                href="/owner/dashboard"
                                active
                            />

                            <NavItem
                                label="Transactions"
                                href="/owner/transactions"
                            />

                            <NavItem
                                label="Reconciliation"
                                href="/owner/reconciliation"
                            />

                            <ShopNavDropdown shops={shops} activeShopId={activeShopId} />
                            <NavItem
                                label="Profile"
                                href="/owner/profile"
                            />

                            <div className="pb-2 pt-7">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A7A7AB]">
                                    Management
                                </p>
                            </div>

                            <NavItem
                                label="Employees"
                                href="/owner/employees"
                            />

                            <NavItem
                                label="Tills"
                                href="/owner/tills"
                            />

                        </nav>

                        {/* Owner */}
                        <OwnerMenu auth={auth} />

</aside>
    </>
}

