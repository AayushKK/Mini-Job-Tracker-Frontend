import { Application } from '@/types';
import { format } from 'date-fns';
import StatusBadge from './StatusBadge';
import ApplicationActions from './ApplicationActions';

export default function ApplicationRow({ application, onDelete }: { application: Application; onDelete: (id: string) => void }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{application.company_name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.job_title}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{application.job_type}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={application.status} /></td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{format(new Date(application.applied_date), 'MMM d, yyyy')}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right"><ApplicationActions id={application.id} onDelete={onDelete} /></td>
    </tr>
  );
}