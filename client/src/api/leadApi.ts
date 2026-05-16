import axiosInstance from './axiosInstance';
import type { ApiResponse, ILead, LeadFilters, PaginationMeta } from '../types';

interface LeadsResponse {
  data: ILead[];
  pagination: PaginationMeta;
}

export const getLeadsApi = async (filters: LeadFilters): Promise<LeadsResponse> => {
  const params: Record<string, string> = {};
  if (filters.status) params.status = filters.status;
  if (filters.source) params.source = filters.source;
  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.sortOrder) params.sortOrder = filters.sortOrder;
  if (filters.page) params.page = String(filters.page);
  if (filters.limit) params.limit = String(filters.limit);

  const res = await axiosInstance.get<ApiResponse<ILead[]>>('/leads', { params });
  return {
    data: res.data.data ?? [],
    pagination: res.data.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 0 },
  };
};

export const getLeadByIdApi = async (id: string): Promise<ILead> => {
  const res = await axiosInstance.get<ApiResponse<ILead>>(`/leads/${id}`);
  return res.data.data as ILead;
};

export const createLeadApi = async (data: {
  name: string;
  email: string;
  status?: string;
  source: string;
}): Promise<ILead> => {
  const res = await axiosInstance.post<ApiResponse<ILead>>('/leads', data);
  return res.data.data as ILead;
};

export const updateLeadApi = async (
  id: string,
  data: Partial<{ name: string; email: string; status: string; source: string }>
): Promise<ILead> => {
  const res = await axiosInstance.put<ApiResponse<ILead>>(`/leads/${id}`, data);
  return res.data.data as ILead;
};

export const deleteLeadApi = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/leads/${id}`);
};

export const exportLeadsCsvApi = async (filters: LeadFilters): Promise<void> => {
  const params: Record<string, string> = {};
  if (filters.status) params.status = filters.status;
  if (filters.source) params.source = filters.source;
  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.sortOrder) params.sortOrder = filters.sortOrder;

  const res = await axiosInstance.get('/leads/export/csv', {
    params,
    responseType: 'blob',
  });

  const url = globalThis.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'leads.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  globalThis.URL.revokeObjectURL(url);
};
