import {
  UserRole,
  UserStatus,
  UserAuthenticatedMethods,
  UsersSortBy,
  SortOrder,
} from "./types";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;
export const AUTO_FILL_THRESHOLD = 16;

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
