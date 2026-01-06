export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  // Use a regular function to allow 'this' binding if needed
  const debounced = function(this: any, ...args: Parameters<T>) {
    const context = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null; // Clean up the reference
      fn.apply(context, args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}