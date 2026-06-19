import { useState, useEffect } from 'react';
import { getStats } from '@/services/api';
import { ApplicationStats } from '@/types';

export function useStats() {
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await getStats();
        if (response.success) setStats(response.data);
        else setError('Failed to fetch statistics');
      } catch (err) {
        setError('An error occurred while fetching statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading, error };
}