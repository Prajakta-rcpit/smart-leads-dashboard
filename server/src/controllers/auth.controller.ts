import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';
import { sendResponse } from '../utils/apiResponse.js';
import User from '../models/User.js';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.registerUser(name, email, password, role);
    sendResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    sendResponse(res, 200, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    sendResponse(res, 200, 'User profile retrieved', user);
  } catch (error) {
    next(error);
  }
};
