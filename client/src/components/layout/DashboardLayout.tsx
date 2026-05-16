import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="relative">
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 text-gray-500 dark:text-gray-400 md:hidden z-10 transition-colors"
          >
            <Menu size={20} />
          </button>
          <Header />
        </div>
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
