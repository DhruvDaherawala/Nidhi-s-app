'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/dashboard/products', icon: Package },
        { name: 'Orders', href: '/admin/dashboard/orders', icon: ShoppingCart },
        { name: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
    ];

    async function handleLogout() {
        // In a real app, call an API to clear cookie
        // For now, we just redirect as we can't clear httpOnly cookie from client JS easily without an endpoint
        // So we'll implementing a logout route later or just formatting the cookie
        // Actually, document.cookie won't work for HttpOnly. 
        // We should call /api/auth/logout. I'll implement that later.
        // For now, just redirecting to login.
        document.cookie = 'token=; Max-Age=0; path=/;'; // Attempt to clear if not httpOnly (but it is)
        window.location.href = '/admin/login';
    }

    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col p-6">
            <div className="mb-10 flex items-center gap-2 px-2">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
                <span className="font-bold text-xl font-serif text-foreground">Admin Panel</span>
            </div>

            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-medium mt-auto"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </aside>
    );
}
