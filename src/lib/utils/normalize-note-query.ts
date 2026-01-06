import { DEFAULT_NOTE_QUERY } from "../constants/note-query";

export function normalizeNoteQuery(params: Record<string, any>) {
  return {
    page: params.page ? Number(params.page) : DEFAULT_NOTE_QUERY.page,
    limit: params.limit ? Number(params.limit) : DEFAULT_NOTE_QUERY.limit,
    search: params.search ?? DEFAULT_NOTE_QUERY.search,
    dateRange: params.dateRange ?? DEFAULT_NOTE_QUERY.dateRange,
    status: params.status ?? DEFAULT_NOTE_QUERY.status,
    sortBy: params.sortBy ?? DEFAULT_NOTE_QUERY.sortBy,
    sortOrder: params.sortOrder ?? DEFAULT_NOTE_QUERY.sortOrder,
  };
}
