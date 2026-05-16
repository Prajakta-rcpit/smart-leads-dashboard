import Lead from '../models/Lead.js';
import { ILead, LeadQueryParams, PaginationMeta } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MongoFilter = Record<string, any>;

export const createLead = async (data: Partial<ILead>) => {
  const lead = await Lead.create(data);
  return lead;
};

export const getLeads = async (params: LeadQueryParams) => {
  const {
    status,
    source,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = params;

  const filter: MongoFilter = {};

  if (status) {
    filter.status = status;
  }

  if (source) {
    filter.source = source;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Lead.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const sort: Record<string, 1 | -1 | 'asc' | 'desc'> = { [sortBy]: sortOrder };

  const leads = await Lead.find(filter).sort(sort).skip(skip).limit(limit);

  const pagination: PaginationMeta = {
    page,
    limit,
    total,
    totalPages,
  };

  return { leads, pagination };
};

export const getLeadById = async (id: string) => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw new AppError('Lead not found', 404);
  }
  return lead;
};

export const updateLead = async (id: string, data: Partial<ILead>) => {
  const lead = await Lead.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!lead) {
    throw new AppError('Lead not found', 404);
  }
  return lead;
};

export const deleteLead = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    throw new AppError('Lead not found', 404);
  }
  return lead;
};

export const getLeadsForExport = async (params: LeadQueryParams) => {
  const { status, source, search, sortBy = 'createdAt', sortOrder = 'desc' } = params;

  const filter: MongoFilter = {};

  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const sort: Record<string, 1 | -1 | 'asc' | 'desc'> = { [sortBy]: sortOrder };
  const leads = await Lead.find(filter).sort(sort);
  return leads;
};
