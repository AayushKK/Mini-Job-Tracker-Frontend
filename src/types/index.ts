export type JobType = 'Internship' | 'Full-time' | 'Part-time';
export type Status = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface Application {
  id: string;
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: Status;
  applied_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormData {
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: Status;
  applied_date: string;
  notes?: string;
}

export interface ApplicationStats {
  total: number;
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
}