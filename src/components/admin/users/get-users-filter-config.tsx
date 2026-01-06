"use client";

import { DateRange } from "@/types/notes/note-query";
import {
  UserAuthenticatedMethods,
  UserRole,
  UsersSortBy,
  UserStatus,
} from "@/types/users/users-query";
import RoleFilter from "./filters/role-filter";
import StatusFilter from "./filters/status-filter";
import AuthenticateFilter from "./filters/authenticate-filter";
import SortFilter from "./filters/sort-filter";
import { CreatedDateFilter } from "./filters/Calender-filter";

export function getUsersFiltersConfig(
  filters: {
    role: UserRole;
    status: UserStatus;
    authenticatedMethod: UserAuthenticatedMethods;
    createdFrom: string;
    createdTo: string;
    sortBy: UsersSortBy;
  },
  updateFilters: (partial: Partial<typeof filters>) => void
) {
  return [
    {
      key: "role",
      component: RoleFilter,
      value: filters.role,
      onChange: (role: UserRole) => updateFilters({ role }),
    },
    {
      key: "status",
      component: StatusFilter,
      value: filters.status,
      onChange: (status: UserStatus) => updateFilters({ status }),
    },
    {
      key: "authenticatedMethod",
      component: AuthenticateFilter,
      value: filters.authenticatedMethod,
      onChange: (authenticatedMethod: UserAuthenticatedMethods) =>
        updateFilters({ authenticatedMethod }),
    },
    {
      key: "dateRange",
      component: CreatedDateFilter,
      value: { createdFrom: filters.createdFrom, createdTo: filters.createdTo },
      onChange: ({ createdFrom, createdTo }: any) =>
        updateFilters({ createdFrom, createdTo }),
    },
    {
      key: "sortBy",
      component: SortFilter,
      value: filters.sortBy,
      onChange: (sortBy: UsersSortBy) => updateFilters({ sortBy }),
    },
  ];
}
