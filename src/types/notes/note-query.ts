// used by filters, constants, query normalization etc

export type NoteStatus = "all" | "favorite" | "pinned";
export type NoteSortBy = "updatedAt" | "createdAt" | "title";
export type DateRange = "all" | "today" | "last7" | "last30";
export type SortOrder = "asc" | "desc";