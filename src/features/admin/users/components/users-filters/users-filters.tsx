"use client";

import { Dispatch, SetStateAction } from "react";
import { useUsersFilters } from "../../hooks/use-users-filter";
import FilterBar from "@/features/shared/ui/filter-bar";
import { SearchInput } from "@/features/shared/ui/search-input";
import { UsersQuery } from "../../types";

type UsersFilterProps = {
  filters: UsersQuery;
  onChange: Dispatch<SetStateAction<Partial<UsersQuery>>>;
};

const UsersFilter = ({ filters, onChange }: UsersFilterProps) => {
  const filterConfig = useUsersFilters(filters, onChange);

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
