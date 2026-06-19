'use client';

import { useRouter } from 'next/navigation';
import ApplicationForm from '@/components/applications/ApplicationForm';
import { createApplication } from '@/services/api';
import { ApplicationFormData } from '@/types';

export default function CreateApplicationPage() {
  const router = useRouter();

  const handleSubmit = async (data: ApplicationFormData) => {
    const response = await createApplication(data);
    if (response.success) {
      router.push(`/applications/${response.data.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Application</h1>
      <ApplicationForm onSubmit={handleSubmit} />
    </div>
  );
}