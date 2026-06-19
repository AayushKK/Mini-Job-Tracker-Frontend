'use client';

import { useRouter } from 'next/navigation';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { deleteApplication } from '@/services/api';
import { useState } from 'react';

export default function ApplicationActions({ id, onDelete }: { id: string; onDelete: (id: string) => void }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return;
    setIsDeleting(true);
    try {
      await deleteApplication(id);
      onDelete(id);
    } catch (error) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <button onClick={() => router.push(`/applications/${id}`)} className="text-blue-600 hover:text-blue-900 p-1" title="View">
        <FiEye size={18} />
      </button>
      <button onClick={() => router.push(`/edit/${id}`)} className="text-indigo-600 hover:text-indigo-900 p-1" title="Edit">
        <FiEdit2 size={18} />
      </button>
      <button onClick={handleDelete} disabled={isDeleting} className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50" title="Delete">
        <FiTrash2 size={18} />
      </button>
    </div>
  );
}