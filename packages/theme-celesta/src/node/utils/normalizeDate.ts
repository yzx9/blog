/**
 * Format: yyyy-MM-dd
 * @param date
 */
export const normalizeDate = (date: Date | string | number) => {
  const d = new Date(date)
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].join("-")
}
