import { DEFAULT_PAGE, DEFAULT_LIMIT } from "@/lib/constants/pagination";
import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";
import {
  UserAuthenticatedMethods,
  UserRole,
  UsersSortBy,
  UserStatus,
} from "@/types/users/users-query";
import { SortOrder } from "mongoose";

export const DEFAULT_USERS_QUERY = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  search: "",
  role: "all" as UserRole,
  status: "active" as UserStatus,
  authenticatedMethod: "all" as UserAuthenticatedMethods,
  createdFrom: "",
  createdTo: "",
  sortBy: "updatedAt" as UsersSortBy,
  sortOrder: "asc" as SortOrder,
};
