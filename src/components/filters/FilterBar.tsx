import SearchInput from './SearchInput';
import StatusFilter from './StatusFilter';
import Button from '@/components/ui/Button';

export default function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onClearFilters,
  hasFilters,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}) {
  return (
    <div className="flex flex-row sm:flex-row gap-4 mb-6">
      <SearchInput value={search} onChange={onSearchChange} />
      <StatusFilter value={status} onChange={onStatusChange} />
      {hasFilters && <Button variant="secondary" onClick={onClearFilters}>Clear Filters</Button>}
    </div>
  );
}