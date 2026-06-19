'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ApplicationFormData } from '@/types';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const schema = z.object({
  company_name: z.string().min(2, 'Required'),
  job_title: z.string().min(1, 'Required'),
  job_type: z.enum(['Internship', 'Full-time', 'Part-time']),
  status: z.enum(['Applied', 'Interviewing', 'Offer', 'Rejected']),
  applied_date: z.string().min(1, 'Required'),
  notes: z.string().optional(),
});

type FormInputs = z.infer<typeof schema>;

export default function ApplicationForm({
  initialData,
  onSubmit,
  isEditing = false,
}: {
  initialData?: Partial<ApplicationFormData>;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  isEditing?: boolean;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: initialData?.company_name || '',
      job_title: initialData?.job_title || '',
      job_type: initialData?.job_type || 'Full-time',
      status: initialData?.status || 'Applied',
      applied_date: initialData?.applied_date || new Date().toISOString().split('T')[0],
      notes: initialData?.notes || '',
    },
  });

  const onFormSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    try { await onSubmit(data); } finally { setIsSubmitting(false); }
  };

  const jobTypeOptions = [
    { value: 'Internship', label: 'Internship' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
  ];

  const statusOptions = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Interviewing', label: 'Interviewing' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input {...register('company_name')} label="Company Name *" placeholder="Google" error={errors.company_name?.message} />
        </div>
        <div className="md:col-span-2">
          <Input {...register('job_title')} label="Job Title *" placeholder="Software Engineer" error={errors.job_title?.message} />
        </div>
        <div>
          <Select {...register('job_type')} label="Job Type *" options={jobTypeOptions} error={errors.job_type?.message} />
        </div>
        <div>
          <Select {...register('status')} label="Status *" options={statusOptions} error={errors.status?.message} />
        </div>
        <div className="md:col-span-2">
          {isEditing ? (
            <Input {...register('applied_date')} label="Applied Date *" placeholder={initialData?.applied_date} error={errors.applied_date?.message} />
          ) : (
            <Input {...register('applied_date')} type="date" label="Applied Date *" error={errors.applied_date?.message} />
          )}
        </div>
        <div className="md:col-span-2">
          <textarea {...register('notes')} rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Notes" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="submit" isLoading={isSubmitting} className="flex-1">{isEditing ? 'Update Application' : 'Add Application'}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}