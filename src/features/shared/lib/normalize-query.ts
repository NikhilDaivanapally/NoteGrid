export function normalizeQueryWithDefaults<T extends Record<string, any>>(
  params: Record<string, any>,
  defaults: T,
): T {
  const result = { ...defaults };

  for (const key in defaults) {
    const value = params[key];

    if (value === undefined || value === null || value === "") continue;

    // auto number casting
    if (typeof defaults[key] === "number") {
      (result as any)[key] = Number(value);
    } else {
      (result as any)[key] = value;
    }
  }

  return result;
}
