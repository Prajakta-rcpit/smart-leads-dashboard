import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCsv,
} from '../controllers/lead.controller.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadSchema } from '../validators/index.js';
import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../types/index.js';

const router = Router();

// All lead routes require authentication
router.use(protect);

router.get('/export/csv', exportLeadsCsv);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', validate(createLeadSchema), createLead);
router.put('/:id', authorize(UserRole.Admin), validate(updateLeadSchema), updateLead);
router.delete('/:id', authorize(UserRole.Admin), deleteLead);

export default router;
