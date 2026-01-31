"use client";

import { useRef } from "react";
import UsersListView from "./users-list.view";
import { hasActiveFilters } from "@/features/shared/lib/has-active-filters";
import { DEFAULT_USERS_QUERY } from "../../constants";
import { useGetUsersQuery } from "../../api";
import { useGetUserQuery } from "@/features/auth/api";

export default function UsersListContainer({
  filters,
  handlePage,
}: {
  filters: any;
  handlePage: (page: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetUsersQuery(filters);
  const { data: user } = useGetUserQuery({});

  const isFiltered = hasActiveFilters(filters, DEFAULT_USERS_QUERY);

  return (
    <UsersListView
      ref={scrollRef}
      isLoading={isLoading}
      isFirstPage={filters.page == 1}
      isFiltered={isFiltered}
      filters={filters}
      currentUser={user}
      data={data}
      handlePage={handlePage}
    />
  );
}
