import mongoose, { Schema } from 'mongoose';
import { ILead, LeadStatus, LeadSource } from '../types/index.js';

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.New,
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: [true, 'Source is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILead>('Lead', leadSchema);

export default Lead;
