"use client";

import { useState } from "react";

type WithPage = {
  page: number;
};

export function useFilters<T extends WithPage>(
  defaultFilters: T,
  initialFilters: T
) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilters = (partial: Partial<T>) => {
    setFilters((prev) => ({
      ...prev,
      ...partial,
      page: partial.page ?? 1,
    }));
  };

  const nextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return { filters, updateFilters, nextPage, resetFilters, handlePage };
}
