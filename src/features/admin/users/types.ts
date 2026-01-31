// used by filters, constants, query normalization etc

export type UserStatus = "active" | "banned";
export type UsersSortBy = "updatedAt" | "createdAt" | "name";
export type SortOrder = "asc" | "desc";
export type UserRole = "all" | "admin" | "user";
export type UserAuthenticatedMethods = "google" | "credential" | "all";

export type UsersQuery = {
  search: string;
  role: UserRole;
  status: UserStatus;
  authenticatedMethod: UserAuthenticatedMethods;
  createdFrom: string;
  createdTo: string;
  sortBy: UsersSortBy;
};
