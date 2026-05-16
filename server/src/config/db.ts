import mongoose from 'mongoose';
import { config } from './env.js';

const connectDB = async (): Promise<void> => {
  try {
    console.log(config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
