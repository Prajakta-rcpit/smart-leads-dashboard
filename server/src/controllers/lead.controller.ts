import { Request, Response, NextFunction } from 'express';
import { Parser } from 'json2csv';
import * as leadService from '../services/lead.service.js';
import { sendResponse } from '../utils/apiResponse.js';
import { LeadQueryParams } from '../types/index.js';

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.createLead(req.body);
    sendResponse(res, 201, 'Lead created successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const params: LeadQueryParams = {
      status: req.query.status as LeadQueryParams['status'],
      source: req.query.source as LeadQueryParams['source'],
      search: req.query.search as string | undefined,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      page: Number.parseInt(req.query.page as string, 10) || 1,
      limit: Number.parseInt(req.query.limit as string, 10) || 10,
    };

    const { leads, pagination } = await leadService.getLeads(params);
    sendResponse(res, 200, 'Leads retrieved successfully', leads, pagination);
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.getLeadById(req.params.id as string);
    sendResponse(res, 200, 'Lead retrieved successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await leadService.updateLead(req.params.id as string, req.body);
    sendResponse(res, 200, 'Lead updated successfully', lead);
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await leadService.deleteLead(req.params.id as string);
    sendResponse(res, 200, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCsv = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const params: LeadQueryParams = {
      status: req.query.status as LeadQueryParams['status'],
      source: req.query.source as LeadQueryParams['source'],
      search: req.query.search as string | undefined,
      sortBy: (req.query.sortBy as string) || 'createdAt',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const leads = await leadService.getLeadsForExport(params);

    const fields = ['name', 'email', 'status', 'source', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};
