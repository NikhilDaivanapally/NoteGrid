"use client";

import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "@/components/search/search-input";
import { DEFAULT_USERS_QUERY } from "@/lib/constants/users-query";
import FilterBar from "@/components/filter-bar";
import { getUsersFiltersConfig } from "./get-users-filter-config";

const UsersFilter = ({
  filters,
  onChange,
}: {
  filters: typeof DEFAULT_USERS_QUERY;
  onChange: Dispatch<SetStateAction<Partial<typeof DEFAULT_USERS_QUERY>>>;
}) => {
  const filterConfig = getUsersFiltersConfig(filters, onChange);

  return (
    <div className="flex justify-between gap-6 lg:gap-3 bg-background items-center lg:items-end m-3 mb-0 mt-0 p-3 pt-0.5 border-b">
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ search })}
      />
      <FilterBar filters={filterConfig} />
    </div>
  );
};

export default UsersFilter;
