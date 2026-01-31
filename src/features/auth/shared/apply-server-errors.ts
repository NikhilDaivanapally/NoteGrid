export const applyServerErrors = <T extends Record<string, any>>(
  form: {
    setError: (name: keyof T, error: { message: string }) => void;
    setFocus: (name: keyof T) => void;
  },
  fieldErrors: Partial<Record<keyof T, string[]>>,
) => {
  const fields = Object.keys(fieldErrors) as (keyof T)[];

  if (fields[0]) form.setFocus(fields[0]);

  fields.forEach((field) => {
    const message = fieldErrors[field]?.[0];
    if (message) form.setError(field, { message });
  });
};
