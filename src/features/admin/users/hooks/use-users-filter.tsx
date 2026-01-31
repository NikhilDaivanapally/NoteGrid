import {
  UserAuthenticatedMethods,
  UserRole,
  UsersQuery,
  UsersSortBy,
  UserStatus,
} from "../types";

import { CreatedDateFilter } from "../filters/Calender-filter";
import { SelectFilter } from "@/features/shared/ui/select-filter";
import { FilterConfig } from "@/features/shared/ui/filter-bar";

type DateRange = {
  createdFrom: string;
  createdTo: string;
};

export function useUsersFilters(
  filters: UsersQuery,
  updateFilters: (partial: Partial<UsersQuery>) => void,
): FilterConfig[] {
  return [
    {
      key: "role",
      label: "Role",
      component: SelectFilter,
      options: [
        { label: "All", value: "all" },
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      value: filters.role,
      onChange: (value: unknown) => updateFilters({ role: value as UserRole }),
    },
    {
      key: "status",
      label: "Status",
      component: SelectFilter,
      options: [
        { label: "Active", value: "active" },
        { label: "Banned", value: "banned" },
      ],
      value: filters.status,
      onChange: (value: unknown) =>
        updateFilters({ status: value as UserStatus }),
    },
    {
      key: "provider",
      label: "Provider",
      component: SelectFilter,
      options: [
        { label: "All", value: "all" },
        { label: "Google", value: "google" },
        { label: "Credential", value: "credential" },
      ],
      value: filters.authenticatedMethod,
      onChange: (value: unknown) =>
        updateFilters({
          authenticatedMethod: value as UserAuthenticatedMethods,
        }),
    },
    {
      key: "dateRange",
      label: "Date Range",
      component: CreatedDateFilter,
      value: {
        createdFrom: filters.createdFrom,
        createdTo: filters.createdTo,
      },
      onChange: (value: unknown) => updateFilters(value as DateRange),
    },
    {
      key: "sortBy",
      label: "Sort",
      component: SelectFilter,
      options: [
        { label: "Last Updated", value: "updatedAt" },
        { label: "Created Date", value: "createdAt" },
        { label: "Name (A-Z)", value: "name" },
      ],
      value: filters.sortBy,
      onChange: (value: unknown) =>
        updateFilters({ sortBy: value as UsersSortBy }),
    },
  ];
}
