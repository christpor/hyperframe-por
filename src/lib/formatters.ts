export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "m";
  }
  if (num >= 10_000) {
    return (num / 1_000).toFixed(1) + "k";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "k";
  }
  return num.toString();
}
