// Shared / API-safe (used by API routes, RTK Query, UI compoennts)

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  data: Note[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}
