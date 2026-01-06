type Filters = Record<string, any>;

export function hasActiveFilters(
  current: Filters,
  defaults: Filters,
  ignoredKeys: string[] = ["page"]
) {
  return Object.keys(defaults).some((key) => {
    if (ignoredKeys.includes(key)) return false;

    return current[key] !== defaults[key];
  });
}
