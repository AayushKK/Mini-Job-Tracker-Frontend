'use client';

import { Application } from '@/types';
import { format } from 'date-fns';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { deleteApplication } from '@/services/api';
import { useState } from 'react';
import StatusBadge from './StatusBadge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ApplicationDetail({ application }: { application: Application }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${application.company_name}"?`)) return;
    setIsDeleting(true);
    try {
      await deleteApplication(application.id);
      router.push('/');
    } catch (error) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => router.push('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <FiArrowLeft size={20} /> Back
      </button>
      <Card className="overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">{application.company_name}</h1>
              <p className="text-lg text-gray-600">{application.job_title}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push(`/edit/${application.id}`)} variant="secondary">Edit</Button>
              <Button onClick={handleDelete} variant="danger" isLoading={isDeleting}>Delete</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div><p className="text-sm text-gray-500">Type</p><p className="font-medium">{application.job_type}</p></div>
            <div><p className="text-sm text-gray-500">Status</p><StatusBadge status={application.status} /></div>
            <div><p className="text-sm text-gray-500">Applied</p><p className="font-medium">{format(new Date(application.applied_date), 'MMMM d, yyyy')}</p></div>
            <div><p className="text-sm text-gray-500">Updated</p><p className="font-medium">{format(new Date(application.updated_at), 'MMM d, yyyy')}</p></div>
          </div>
          {application.notes && (
            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{application.notes}</p>
            </div>
          )}
          <div className="border-t pt-4 mt-6">
            <p className="text-xs text-gray-400">Created: {format(new Date(application.created_at), 'MMM d, yyyy')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}