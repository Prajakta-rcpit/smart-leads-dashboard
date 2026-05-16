import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-surface-800/80 backdrop-blur-xl flex items-center justify-between px-6">
      <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent md:hidden">
        SmartLeads
      </h1>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1" />
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-50 dark:bg-surface-700">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white">
            <User size={14} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-tight">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
