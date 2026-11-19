'use client';
import { useAdmin, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BlogManager from '@/components/admin/BlogManager';
import FileUploadManager from '@/components/admin/FileUploadManager';
import Spinner from '@/components/ui/Spinner';
import * as Tabs from '@radix-ui/react-tabs';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) router.replace('/admin');
  }, [user, isAdmin, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>;
  if (!user || !isAdmin) return null;

  const handleLogout = async () => { await logoutUser(); router.replace('/admin'); };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">APPTD Employees Union — Content Management</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">{user.email}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Radix Tabs */}
        <Tabs.Root defaultValue="blogs">
          <Tabs.List className="tabs-list">
            <Tabs.Trigger value="blogs" className="tabs-trigger">Manage Blogs</Tabs.Trigger>
            <Tabs.Trigger value="circulars" className="tabs-trigger">Manage Circulars</Tabs.Trigger>
            <Tabs.Trigger value="union_affairs" className="tabs-trigger">Union Affairs</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="blogs" className="tabs-content">
            <BlogManager />
          </Tabs.Content>
          <Tabs.Content value="circulars" className="tabs-content">
            <FileUploadManager collection="circulars" storagePath="circulars" label="Circular" accept=".pdf,image/*" acceptLabel="PDF, PNG, JPG up to 10MB" />
          </Tabs.Content>
          <Tabs.Content value="union_affairs" className="tabs-content">
            <FileUploadManager collection="union_affairs" storagePath="union_affairs" label="Union Affair" accept=".pdf,image/*,audio/mpeg,audio/mp3" acceptLabel="PDF, PNG, JPG, MP3" />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
