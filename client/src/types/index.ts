export const LeadStatus = {
  New: 'New',
  Contacted: 'Contacted',
  Qualified: 'Qualified',
  Lost: 'Lost',
} as const;
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const LeadSource = {
  Website: 'Website',
  Instagram: 'Instagram',
  Referral: 'Referral',
} as const;
export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource];

export const UserRole = {
  Admin: 'admin',
  Sales: 'sales',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface LeadFilters {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
