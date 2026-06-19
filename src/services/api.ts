import axios from 'axios';
import { Application, ApplicationFormData, ApplicationStats } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getApplications = async (filters?: { status?: string; search?: string }) => {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  const response = await api.get<{ success: boolean; data: Application[]; count: number }>(
    `/applications?${params.toString()}`
  );
  return response.data;
};

export const getApplication = async (id: string) => {
  const response = await api.get<{ success: boolean; data: Application }>(`/applications/${id}`);
  return response.data;
};

export const createApplication = async (data: ApplicationFormData) => {
  const response = await api.post<{ success: boolean; data: Application }>('/applications', data);
  return response.data;
};

export const updateApplication = async (id: string, data: Partial<ApplicationFormData>) => {
  const response = await api.patch<{ success: boolean; data: Application }>(`/applications/${id}`, data);
  return response.data;
};

export const deleteApplication = async (id: string) => {
  const response = await api.delete<{ success: boolean; message: string }>(`/applications/${id}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get<{ success: boolean; data: ApplicationStats }>('/applications/stats');
  return response.data;
};

export default api;