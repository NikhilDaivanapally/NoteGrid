"use client";

import UsersFilter from "./users-filter";
import { useFilters } from "@/hooks/use-filters";
import { DEFAULT_USERS_QUERY } from "@/lib/constants/users-query";
import { useSyncUrlWithFilters } from "@/hooks/use-sync-url-with-filters";
import UsersListContainer from "./users-container";

export default function UsersPage({ initialFilters }: any) {
  const { filters, updateFilters, handlePage } = useFilters(
    DEFAULT_USERS_QUERY,
    initialFilters
  );

  // sync url with filters
  useSyncUrlWithFilters<typeof DEFAULT_USERS_QUERY>(
    filters,
    DEFAULT_USERS_QUERY
  );

  return (
    <>
      <UsersFilter filters={filters} onChange={updateFilters} />
      <UsersListContainer filters={filters} handlePage={handlePage} />
    </>
  );
}
