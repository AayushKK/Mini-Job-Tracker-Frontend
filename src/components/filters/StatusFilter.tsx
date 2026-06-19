import Select from '@/components/ui/Select';

const options = [
  { value: '', label: 'All Statuses' },
  { value: 'Applied', label: 'Applied' },
  { value: 'Interviewing', label: 'Interviewing' },
  { value: 'Offer', label: 'Offer' },
  { value: 'Rejected', label: 'Rejected' },
];

export default function StatusFilter({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <Select value={value} onChange={(e) => onChange(e.target.value)} options={options} className="min-w-[140px]" />;
}