import { DEFAULT_USERS_QUERY } from "../constants/users-query";

export function normalizeUsersQuery(params: Record<string, any>) {
  return {
    page: params.page ? Number(params.page) : DEFAULT_USERS_QUERY.page,
    limit: params.limit ? Number(params.limit) : DEFAULT_USERS_QUERY.limit,
    search: params.search ?? DEFAULT_USERS_QUERY.search,
    role: params.role ?? DEFAULT_USERS_QUERY.role,
    status: params.status ?? DEFAULT_USERS_QUERY.status,
    authenticatedMethod:
      params.authenticatedMethod ?? DEFAULT_USERS_QUERY.authenticatedMethod,
    createdFrom: params.createdFrom ?? DEFAULT_USERS_QUERY.createdFrom,
    createdTo: params.createdTo ?? DEFAULT_USERS_QUERY.createdTo,
    sortBy: params.sortBy ?? DEFAULT_USERS_QUERY.sortBy,
    sortOrder: params.sortOrder ?? DEFAULT_USERS_QUERY.sortOrder,
  };
}
