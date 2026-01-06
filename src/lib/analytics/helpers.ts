export function formatMonth(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
}

export function calculateTrend(current = 0, previous = 0) {
  if (previous === 0 && current === 0) {
    return { value: 0, direction: "neutral" };
  }
  if (previous === 0) {
    return { value: 100, direction: "up" };
  }

  const diff = ((current - previous) / previous) * 100;
  return {
    value: Math.round(Math.abs(diff)),
    direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral",
  };
}
