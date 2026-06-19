'use client';
import ApplicationList from '@/components/applications/ApplicationList';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
export default function HomePage() {
  const router = useRouter();
  return <>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Applications</h1>
      <Button onClick={() => router.push('/create')} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Add New Application</Button>
    </div>
    <ApplicationList />

  </>
    ;
}
