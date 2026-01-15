
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBasket, Settings, Menu, X } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children, onClick }: { to: string; icon: any; children: React.ReactNode; onClick?: () => void }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                ? 'bg-emerald-100 text-emerald-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <Icon size={20} />
            <span>{children}</span>
        </Link>
    );
};

export const Layout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        <span dir="ltr">trit.</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink to="/" icon={LayoutDashboard}>לוח בקרה</SidebarLink>
                    <SidebarLink to="/products" icon={ShoppingBasket}>מוצרים</SidebarLink>
                    <SidebarLink to="/settings" icon={Settings}>הגדרות</SidebarLink>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                            DP
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-700">Dan Patra</p>
                            <p className="text-gray-500 text-xs">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        <span dir="ltr">trit.</span>
                    </h1>
                    <button onClick={closeMobileMenu} className="p-2 text-gray-600 hover:text-gray-900">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink to="/" icon={LayoutDashboard} onClick={closeMobileMenu}>לוח בקרה</SidebarLink>
                    <SidebarLink to="/products" icon={ShoppingBasket} onClick={closeMobileMenu}>מוצרים</SidebarLink>
                    <SidebarLink to="/settings" icon={Settings} onClick={closeMobileMenu}>הגדרות</SidebarLink>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                            DP
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-700">Dan Patra</p>
                            <p className="text-gray-500 text-xs">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800"><span dir="ltr">trit.</span></h1>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
