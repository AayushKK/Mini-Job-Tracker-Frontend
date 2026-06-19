import { useState, useEffect, useCallback } from 'react';
import { getApplications } from '@/services/api';
import { Application } from '@/types';
import { useDebounce } from './useDebounce';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getApplications({
        status: status || undefined,
        search: debouncedSearch || undefined,
      });
      if (response.success) setApplications(response.data || []);
      else setError('Failed to fetch applications');
    } catch (err) {
      setError('An error occurred while fetching applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  return { applications, loading, error, status, search, setStatus, setSearch, deleteApplication };
}