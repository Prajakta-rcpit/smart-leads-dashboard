import { Link } from 'react-router-dom';
import { Zap, BarChart3, Shield, Users, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

const features = [
  {
    icon: BarChart3,
    title: 'Lead Tracking',
    desc: 'Track and manage leads with real-time status updates, filters, and search.',
    color: '#6366f1',
    bg: 'bg-primary-50 dark:bg-primary-500/10',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    desc: 'Admin and Sales roles with fine-grained permissions for every action.',
    color: '#10b981',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Your whole team can create, view, and export leads with CSV support.',
    color: '#f59e0b',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 transition-colors">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 shadow-md shadow-primary-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              SmartLeads
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-xl shadow-md shadow-primary-500/25 transition-all active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-400/15 dark:bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-6">
            <Zap size={14} />
            Smart Lead Management Platform
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
            Manage your leads{' '}
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent">
              smarter & faster
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A powerful MERN stack dashboard to track, filter, and manage your leads.
            Built with role-based access, real-time search, and seamless CSV exports.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-2xl shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]"
            >
              Start for Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-gray-700 dark:text-gray-200 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-gray-600 rounded-2xl border border-gray-200 dark:border-gray-600 transition-all active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Everything you need to manage leads
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Built with the latest technologies for speed, security, and great user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-surface-50 dark:bg-surface-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Built with</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-surface-700 border border-gray-100 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Zap size={14} />
            <span>SmartLeads Dashboard</span>
          </div>
          <p className="text-xs text-gray-400">Full Stack Internship Assignment</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
