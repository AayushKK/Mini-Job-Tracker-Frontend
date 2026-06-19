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
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center gap-2 w-full ">
        <SearchInput value={search} onChange={onSearchChange} />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <StatusFilter value={status} onChange={onStatusChange} />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {hasFilters && <Button variant="secondary" onClick={onClearFilters}>Clear Filters</Button>}
      </div>
    </div>
  );
}