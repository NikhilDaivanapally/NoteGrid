"use client";

import { useFilters } from "@/hooks/use-filters";
import UsersPageView from "./users-page.view";
import { useSyncUrlWithFilters } from "@/features/shared/hooks";
import { DEFAULT_USERS_QUERY } from "../../constants";

export default function UsersPageContainer({ initialFilters }: any) {
  const { filters, updateFilters, handlePage } = useFilters(
    DEFAULT_USERS_QUERY,
    initialFilters,
  );

  // sync url with filters
  useSyncUrlWithFilters<typeof DEFAULT_USERS_QUERY>(
    filters,
    DEFAULT_USERS_QUERY,
  );

  return (
    <UsersPageView
      filters={filters}
      onUpdate={updateFilters}
      handlePage={handlePage}
    />
  );
}
