import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/constants/pagination";
import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";
import { SortOrder } from "mongoose";

export const DEFAULT_NOTE_QUERY = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: "",
  dateRange: "all" as DateRange,
  status: "all" as NoteStatus,
  sortBy: "updatedAt" as NoteSortBy,
  sortOrder: "desc" as SortOrder,
};
