import { FilterConfig } from "../shared/lib/db/build-query";
import { DateRange, NoteStatus } from "./types";

export type NotesFilters = {
  search?: string;
  status?: NoteStatus;
  dateRange?: DateRange;
};

export const notesFilterConfig: FilterConfig<NotesFilters> = {
  search: (value) => ({
    $or: [
      { title: { $regex: value, $options: "i" } },
      { content: { $regex: value, $options: "i" } },
    ],
  }),

  status: (value) => {
    if (value === "favorite") return { isFavorite: true };
    if (value === "pinned") return { isPinned: true };
    return {};
  },

  dateRange: (value) => {
    if (value === "all") return {};

    const now = new Date();
    let fromDate: Date | null = null;

    if (value === "today") {
      fromDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (value === "last7") {
      fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (value === "last30") {
      fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    return fromDate ? { createdAt: { $gte: fromDate } } : {};
  },
};
