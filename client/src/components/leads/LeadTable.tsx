import { Edit2, Trash2, Eye } from 'lucide-react';
import Badge from '../ui/Badge';
import type { ILead } from '../../types';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface LeadTableProps {
  leads: ILead[];
  isLoading: boolean;
  onEdit: (lead: ILead) => void;
  onDelete: (lead: ILead) => void;
  onView: (lead: ILead) => void;
}

const SkeletonRow = ({ row }: { row: number }) => (
  <tr>
    {['name', 'email', 'status', 'source', 'date', 'actions'].map((col) => (
      <td key={`skel-${row}-${col}`} className="px-6 py-4">
        <div className="h-4 skeleton rounded-lg w-3/4" />
      </td>
    ))}
  </tr>
);

const LeadTable = ({ leads, isLoading, onEdit, onDelete, onView }: LeadTableProps) => {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.Admin;

  const thClass = "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider";

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700/50 bg-surface-50/50 dark:bg-surface-800/50">
              <th className={thClass}>Name</th>
              <th className={thClass}>Email</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Source</th>
              <th className={thClass}>Created</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {[1, 2, 3, 4, 5].map((n) => (
              <SkeletonRow key={`skeleton-${n}`} row={n} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
        <div className="w-20 h-20 rounded-2xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center mb-5">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">No leads found</p>
        <p className="text-sm mt-1">Try adjusting your filters or create a new lead.</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700/50 bg-surface-50/50 dark:bg-surface-800/50">
            <th className={thClass}>Name</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Source</th>
            <th className={thClass}>Created</th>
            <th className={`${thClass} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="hover:bg-primary-50/30 dark:hover:bg-primary-500/5 transition-colors duration-150 group"
            >
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{lead.name}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {lead.email}
              </td>
              <td className="px-6 py-4">
                <Badge status={lead.status} />
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                  {lead.source}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onView(lead)}
                    className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-500/10 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        title="Edit lead"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(lead)}
                        className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
