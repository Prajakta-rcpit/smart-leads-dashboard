import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLead } from '../hooks/useLeads';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: lead, isLoading, isError } = useLead(id || '');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Lead not found</p>
        <Button variant="secondary" className="mt-5" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Leads
      </button>

      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-8">Lead Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              Name
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{lead.name}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              Email
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300">{lead.email}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Status
            </p>
            <Badge status={lead.status} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              Source
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300">{lead.source}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              Created At
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {formatDate(lead.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
