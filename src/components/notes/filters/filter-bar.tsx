import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";
import DateRangeFilter from "./date-range-filter";
import SortFilter from "./sort-filter";
import StatusFilter from "./status-filter";
import { SlidersHorizontal } from "lucide-react";

const FilterBar = ({
  status,
  dateRange,
  sortBy,
  onStatusChange,
  onDateRangeChange,
  onSortChange,
}: {
  status: NoteStatus;
  dateRange: DateRange;
  sortBy: NoteSortBy;
  onStatusChange: (status: NoteStatus) => void;
  onDateRangeChange: (dateRange: DateRange) => void;
  onSortChange: (sortBy: NoteSortBy) => void;
}) => {
  return (
    <>
      <div className="lg:hidden">
        <SlidersHorizontal />
      </div>
      <div className="hidden gap-2 lg:flex">
        <StatusFilter value={status} onChange={onStatusChange} />
        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
        <SortFilter value={sortBy} onChange={onSortChange} />
      </div>
    </>
  );
};

export default FilterBar;
