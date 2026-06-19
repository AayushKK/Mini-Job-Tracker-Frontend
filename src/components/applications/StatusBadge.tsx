import Badge from '@/components/ui/Badge';
import { Status } from '@/types';

const statusMap: Record<Status, 'blue' | 'yellow' | 'green' | 'red'> = {
  Applied: 'blue',
  Interviewing: 'yellow',
  Offer: 'green',
  Rejected: 'red',
};

export default function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={statusMap[status]}>{status}</Badge>;
}