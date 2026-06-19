'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ApplicationForm from '@/components/applications/ApplicationForm';
import { getApplication, updateApplication } from '@/services/api';
import { Application, ApplicationFormData } from '@/types';
import Spinner from '@/components/ui/Spinner';

export default function EditApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getApplication(id);
        if (response.success) setApplication(response.data);
        else setError('Application not found');
      } catch (err) {
        setError('Failed to load application');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchApplication();
  }, [id]);

  const handleSubmit = async (data: ApplicationFormData) => {
    const response = await updateApplication(id, data);
    if (response.success) router.push(`/applications/${id}`);
  };

  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => router.push('/')} className="mt-4 text-blue-600 hover:underline">Return to Home</button>
      </div>
    );
  }
  if (!application) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Application</h1>
      <ApplicationForm
        initialData={{
          company_name: application.company_name,
          job_title: application.job_title,
          job_type: application.job_type,
          status: application.status,
          applied_date: application.applied_date,
          notes: application.notes || '',
        }}
        onSubmit={handleSubmit}
        isEditing
      />
    </div>
  );
}