'use client';

import { useStats } from '@/hooks/useStats';
import Card from '@/components/ui/Card';

const config = [
  { key: 'total', label: 'Total', color: 'text-blue-600' },
  { key: 'applied', label: 'Applied', color: 'text-purple-600' },
  { key: 'interviewing', label: 'Interviewing', color: 'text-yellow-600' },
  { key: 'offer', label: 'Offer', color: 'text-green-600' },
  { key: 'rejected', label: 'Rejected', color: 'text-red-600' },
];

export default function ApplicationStats() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (<Card key={i} className="animate-pulse h-20" > <div className="h-full"></div></Card>))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {config.map(({ key, label, color }) => (
        <Card key={key} className="p-4 hover:shadow-lg transition-shadow">
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{stats[key as keyof typeof stats] || 0}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}