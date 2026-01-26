export type FilterConfig<T> = {
  [K in keyof T]?: (value: T[K]) => Record<string, any>;
};

export function buildMongoQuery<T extends Record<string, any>>(
  filters: Partial<T>,
  config: FilterConfig<T>
) {
  const query: Record<string, any> = {};

  for (const key in filters) {
    const value = filters[key];
    if (value == null) continue;

    const mapper = config[key];
    if (mapper) {
      Object.assign(query, mapper(value));
    }
  }

  return query;
}
