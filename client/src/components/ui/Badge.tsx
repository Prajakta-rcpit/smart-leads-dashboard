import { LeadStatus } from '../../types';

interface BadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  [LeadStatus.New]: {
    bg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  [LeadStatus.Contacted]: {
    bg: 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  [LeadStatus.Qualified]: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  [LeadStatus.Lost]: {
    bg: 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
};

const Badge = ({ status }: BadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default Badge;
