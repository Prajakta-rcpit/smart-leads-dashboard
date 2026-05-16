import { z } from 'zod';
import { LeadStatus, LeadSource, UserRole } from '../types/index.js';

const leadStatusValues = Object.values(LeadStatus) as [string, ...string[]];
const leadSourceValues = Object.values(LeadSource) as [string, ...string[]];
const userRoleValues = Object.values(UserRole) as [string, ...string[]];

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(userRoleValues).optional().default(UserRole.Sales),
});

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required'),
});

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email({ message: 'Invalid email address' }),
  status: z.enum(leadStatusValues).optional().default(LeadStatus.New),
  source: z.enum(leadSourceValues),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.email({ message: 'Invalid email address' }).optional(),
  status: z.enum(leadStatusValues).optional(),
  source: z.enum(leadSourceValues).optional(),
});
