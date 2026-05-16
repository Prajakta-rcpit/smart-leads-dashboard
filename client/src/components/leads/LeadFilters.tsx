import { Search, ArrowUpDown } from 'lucide-react';
import Select from '../ui/Select';
import { LeadStatus, LeadSource, type LeadFilters as LeadFiltersType } from '../../types';

interface LeadFiltersProps {
  filters: LeadFiltersType;
  onFilterChange: (filters: Partial<LeadFiltersType>) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const statusOptions = [
  { label: 'All Status', value: '' },
  ...Object.values(LeadStatus).map((s) => ({ label: s, value: s })),
];

const sourceOptions = [
  { label: 'All Sources', value: '' },
  ...Object.values(LeadSource).map((s) => ({ label: s, value: s })),
];

const LeadFilters = ({ filters, onFilterChange, searchValue, onSearchChange }: LeadFiltersProps) => {
  const isDesc = filters.sortOrder === 'desc';

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
        />
      </div>
      <div className="flex gap-3">
        <Select
          options={statusOptions}
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ status: (e.target.value as LeadStatus) || undefined, page: 1 })}
          className="w-40"
        />
        <Select
          options={sourceOptions}
          value={filters.source || ''}
          onChange={(e) => onFilterChange({ source: (e.target.value as LeadSource) || undefined, page: 1 })}
          className="w-40"
        />
        <button
          onClick={() => onFilterChange({ sortOrder: isDesc ? 'asc' : 'desc' })}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-800 text-gray-600 dark:text-gray-300 hover:bg-surface-50 dark:hover:bg-surface-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200"
          title={isDesc ? 'Sort: Latest first' : 'Sort: Oldest first'}
        >
          <ArrowUpDown size={16} />
          {isDesc ? 'Latest' : 'Oldest'}
        </button>
      </div>
    </div>
  );
};

export default LeadFilters;
