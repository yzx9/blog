/**
 * Remove url unfriendly char
 * @param raw
 * @returns
 */
export const normalizeString = (raw: string) =>
  raw.toLowerCase().replace(/[\s, /, ?, %, #, &, =]+/g, "-")

/**
 * Format: yyyy-MM-dd
 * @param date
 * @returns Normalized date
 */
export const normalizeDate = (date: Date | string | number) => {
  const d = new Date(date)
  return [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()].join("-")
}
