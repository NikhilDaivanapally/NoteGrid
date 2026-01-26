import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/constants/pagination";
import { DateRange, NotesSortBy, NoteStatus, SortOrder } from "./types";

export const DEFAULT_NOTE_QUERY = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: "",
  dateRange: "all" as DateRange,
  status: "all" as NoteStatus,
  sortBy: "updatedAt" as NotesSortBy,
  sortOrder: "desc" as SortOrder,
};
