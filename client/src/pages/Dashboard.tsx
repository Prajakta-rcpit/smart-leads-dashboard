import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useDebounce } from '../hooks/useDebounce';
import LeadFilters from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import LeadForm from '../components/leads/LeadForm';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { exportLeadsCsvApi } from '../api/leadApi';
import type { ILead, LeadFilters as LeadFiltersType } from '../types';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  useAuth(); // ensure authenticated
  const navigate = useNavigate();

  const [filters, setFilters] = useState<LeadFiltersType>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState<ILead | null>(null);
  const [deletingLead, setDeletingLead] = useState<ILead | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const queryFilters = { ...filters, search: debouncedSearch || undefined };
  const { data, isLoading, isError, refetch } = useLeads(queryFilters);
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();

  const handleFilterChange = useCallback((newFilters: Partial<LeadFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleCreate = async (formData: { name: string; email: string; status: string; source: string }) => {
    try {
      await createMutation.mutateAsync(formData);
      toast.success('Lead created successfully');
      setShowCreateModal(false);
    } catch {
      toast.error('Failed to create lead');
    }
  };

  const handleUpdate = async (formData: { name: string; email: string; status: string; source: string }) => {
    if (!editingLead) return;
    try {
      await updateMutation.mutateAsync({ id: editingLead._id, data: formData });
      toast.success('Lead updated successfully');
      setEditingLead(null);
    } catch {
      toast.error('Failed to update lead');
    }
  };

  const handleDelete = async () => {
    if (!deletingLead) return;
    try {
      await deleteMutation.mutateAsync(deletingLead._id);
      toast.success('Lead deleted successfully');
      setDeletingLead(null);
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportLeadsCsvApi(queryFilters);
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    } finally {
      setIsExporting(false);
    }
  };

  const handleView = (lead: ILead) => {
    navigate(`/leads/${lead._id}`);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
          <UserX size={28} className="text-red-500" />
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Failed to load leads</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Something went wrong. Please try again.</p>
        <Button variant="secondary" className="mt-5" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const leads = data?.data || [];
  const totalLeads = data?.pagination?.total || 0;
  const newCount = leads.filter(l => l.status === 'New').length;
  const qualifiedCount = leads.filter(l => l.status === 'Qualified').length;
  const lostCount = leads.filter(l => l.status === 'Lost').length;

  const getIconColor = (color: string): string => {
    if (color.includes('primary')) return '#6366f1';
    if (color.includes('emerald')) return '#10b981';
    if (color.includes('red')) return '#ef4444';
    return '#3b82f6';
  };

  const statCards = [
    { label: 'Total Leads', value: totalLeads, icon: Users, color: 'from-primary-500 to-primary-600', bg: 'bg-primary-50 dark:bg-primary-500/10' },
    { label: 'New', value: newCount, icon: UserPlus, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Qualified', value: qualifiedCount, icon: UserCheck, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Lost', value: lostCount, icon: UserX, color: 'from-red-500 to-red-600', bg: 'bg-red-50 dark:bg-red-500/10' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Lead Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track, manage, and convert your leads
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleExport} isLoading={isExporting}>
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={16} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{card.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon size={20} style={{ color: getIconColor(card.color) }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <LeadFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />

      {/* Table */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <LeadTable
          leads={data?.data || []}
          isLoading={isLoading}
          onEdit={(lead) => setEditingLead(lead)}
          onDelete={(lead) => setDeletingLead(lead)}
          onView={handleView}
        />
        {data?.pagination && (
          <Pagination
            pagination={data.pagination}
            onPageChange={(page) => handleFilterChange({ page })}
          />
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Lead"
      >
        <LeadForm
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(null)}
        title="Edit Lead"
      >
        <LeadForm
          lead={editingLead}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          onCancel={() => setEditingLead(null)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingLead}
        onClose={() => setDeletingLead(null)}
        title="Delete Lead"
      >
        <div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <UserX size={18} className="text-red-600 dark:text-red-400" />
            </div>
            <p className="text-sm text-red-700 dark:text-red-300">
              Are you sure you want to delete <strong>{deletingLead?.name}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeletingLead(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleteMutation.isPending}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
