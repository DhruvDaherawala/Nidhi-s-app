import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token || !verifyToken(token)) {
        redirect('/admin/login');
    }

    return (
        <div className="flex min-h-screen bg-secondary/5">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto max-h-screen">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
