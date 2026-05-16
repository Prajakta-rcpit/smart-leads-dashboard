import { NavLink } from 'react-router-dom';
import { LayoutDashboard, X, Zap } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in w-full border-none cursor-default"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-800 border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0 animate-slide-in' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-md shadow-primary-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              SmartLeads
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 text-gray-400 md:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 mt-2 space-y-1">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-surface-50 dark:hover:bg-surface-700 hover:text-gray-700 dark:hover:text-gray-300'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 p-4 border border-primary-100 dark:border-primary-900/20">
            <p className="text-xs font-semibold text-primary-700 dark:text-primary-300">Smart Leads</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Lead Management System</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
