"use client";

import { useEffect } from "react";

type Primitive = string | number | boolean | null | undefined;

export function useSyncUrlWithFilters<T extends Record<string, Primitive>>(
  filters: T,
  defaultFilters: T,
  options?: {
    excludeKeys?: (keyof T)[];
  }
) {
  const excludeKeys = options?.excludeKeys ?? [];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    (Object.keys(filters) as (keyof T)[]).forEach((key) => {
      if (excludeKeys.includes(key)) return;

      const value = filters[key];
      const defaultValue = defaultFilters[key];

      const shouldRemove =
        value === defaultValue || value === "" || value == null;

      if (shouldRemove) {
        params.delete(String(key));
      } else {
        params.set(String(key), String(value));
      }
    });

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [filters, defaultFilters, excludeKeys]);
}
