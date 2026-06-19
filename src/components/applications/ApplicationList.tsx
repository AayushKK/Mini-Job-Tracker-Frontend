'use client';

import { useApplications } from '@/hooks/useApplications';
import ApplicationTable from './ApplicationTable';
import ApplicationStats from './ApplicationStats';
import FilterBar from '@/components/filters/FilterBar';
import Spinner from '@/components/ui/Spinner';

export default function ApplicationList() {
  const { applications, loading, error, status, search, setStatus, setSearch, deleteApplication } = useApplications();
  console.log('📊 Applications in list:', applications);
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      <ApplicationStats />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onClearFilters={() => { setSearch(''); setStatus(''); }}
        hasFilters={status !== '' || search !== ''}
      />
      {loading ? <Spinner /> : <ApplicationTable applications={applications} onDelete={deleteApplication} />}
    </>
  );
}