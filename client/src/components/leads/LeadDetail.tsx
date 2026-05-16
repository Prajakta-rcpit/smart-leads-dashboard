import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { ILead } from '../../types';

interface LeadDetailProps {
  lead: ILead;
  onClose: () => void;
}

const LeadDetail = ({ lead, onClose }: LeadDetailProps) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Name</p>
          <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">{lead.name}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email</p>
          <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">{lead.email}</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Status</p>
          <Badge status={lead.status} />
        </div>
        <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Source</p>
          <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">{lead.source}</p>
        </div>
        <div className="col-span-2 p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Created At</p>
          <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">{formatDate(lead.createdAt)}</p>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default LeadDetail;
