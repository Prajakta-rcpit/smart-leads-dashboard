import axiosInstance from './axiosInstance';
import type { ApiResponse, AuthResponse, IUser } from '../types';

export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthResponse> => {
  const res = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
  return res.data.data as AuthResponse;
};

export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', data);
  return res.data.data as AuthResponse;
};

export const getMeApi = async (): Promise<IUser> => {
  const res = await axiosInstance.get<ApiResponse<IUser>>('/auth/me');
  return res.data.data as IUser;
};
