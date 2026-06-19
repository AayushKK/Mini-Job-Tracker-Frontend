'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getApplication } from '@/services/api';
import { Application } from '@/types';
import Spinner from '@/components/ui/Spinner';
import ApplicationDetail from '@/components/applications/ApplicationDetail';

export default function ApplicationDetailPage() {
  const params = useParams();
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

  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => window.location.href = '/'} className="mt-4 text-blue-600 hover:underline">Return to Home</button>
      </div>
    );
  }
  if (!application) return null;

  return <ApplicationDetail application={application} />;
}