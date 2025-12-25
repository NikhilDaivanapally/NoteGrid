import { NoteStatus } from "@/types/notes/note-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const StatusFilter = ({
  value,
  onChange,
}: {
  value: NoteStatus;
  onChange: (value: NoteStatus) => void;
}) => {
  return (
    <div className="flex md:flex-col xl:flex-row items-start xl:items-center gap-2 text-sm">
      <span className="text-muted-foreground ">Status : </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="favorite">Favorite</SelectItem>
          <SelectItem value="pinned">Pinned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;
