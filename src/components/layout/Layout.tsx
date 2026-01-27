import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, User, BookOpen, Settings, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const SidebarLink = ({ to, icon: Icon, children, onClick }: { to: string; icon: any; children: React.ReactNode; onClick?: () => void }) => {
    const location = useLocation();
    const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-text-muted hover:bg-background-light'
                }`}
        >
            <Icon size={20} />
            <span className="text-sm">{children}</span>
        </Link>
    );
};

export const Layout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const { t } = useTranslation();

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <div className="flex h-screen bg-background-light text-text-main">
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r border-[#dfe2e2] bg-white hidden lg:flex flex-col shrink-0">
                <div className="p-6 flex flex-col gap-6">
                    {/* Brand */}
                    {/* Brand */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="size-8 text-[#4a7874]">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#131515] text-xl font-bold tracking-tight">Trit Studio</h2>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-1">
                        <SidebarLink to="/" icon={LayoutDashboard}>{t('nav.dashboard')}</SidebarLink>
                        <SidebarLink to="/products" icon={BookOpen}>{t('nav.products')}</SidebarLink>
                        <SidebarLink to="/clients" icon={Users}>{t('nav.clients')}</SidebarLink>
                        <SidebarLink to="/coaches" icon={User}>{t('nav.coaches')}</SidebarLink>
                        <SidebarLink to="/settings" icon={Settings}>{t('nav.settings')}</SidebarLink>
                    </nav>
                </div>

                {/* User Profile */}
                <div className="mt-auto p-4 border-t border-[#dfe2e2]">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="text-sm flex-1 min-w-0">
                            <p className="font-medium text-text-main truncate text-xs" title={user?.email}>{user?.email}</p>
                            <p className="text-text-muted text-[10px]">Admin</p>
                        </div>
                        <button
                            onClick={signOut}
                            className="text-text-muted hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-[#dfe2e2] z-50 transform transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6 border-b border-[#dfe2e2] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-6 text-[#4a7874]">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#131515] text-lg font-bold tracking-tight">Trit Studio</h2>
                    </div>
                    <button onClick={closeMobileMenu} className="p-2 text-text-muted hover:text-text-main">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink to="/" icon={LayoutDashboard} onClick={closeMobileMenu}>{t('nav.dashboard')}</SidebarLink>
                    <SidebarLink to="/products" icon={BookOpen} onClick={closeMobileMenu}>{t('nav.products')}</SidebarLink>
                    <SidebarLink to="/clients" icon={Users} onClick={closeMobileMenu}>{t('nav.clients')}</SidebarLink>
                    <SidebarLink to="/coaches" icon={User} onClick={closeMobileMenu}>{t('nav.coaches')}</SidebarLink>
                    <SidebarLink to="/settings" icon={Settings} onClick={closeMobileMenu}>{t('nav.settings')}</SidebarLink>
                </nav>

                <div className="p-4 border-t border-[#dfe2e2]">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="text-sm flex-1 min-w-0">
                            <p className="font-medium text-text-main truncate text-xs" title={user?.email}>{user?.email}</p>
                            <p className="text-text-muted text-[10px]">Admin</p>
                        </div>
                        <button onClick={signOut} className="text-text-muted hover:text-red-500 transition-colors" title="Logout">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-[#dfe2e2] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-6 text-[#4a7874]">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-[#131515] text-lg font-bold tracking-tight">Trit Studio</h2>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 text-text-muted hover:text-text-main"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
