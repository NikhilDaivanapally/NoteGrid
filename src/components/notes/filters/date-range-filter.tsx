import { DateRange } from "@/types/notes/note-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const DateRangeFilter = ({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (value: DateRange) => void;
}) => {
  return (
    <div className="flex md:flex-col xl:flex-row items-start xl:items-center gap-2 text-sm">
      <span className="text-muted-foreground">Date Range : </span>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-34">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="last7">Last 7 Days</SelectItem>
          <SelectItem value="last30">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateRangeFilter;
