/**
 * Normalize string to readable case
 * @param raw split with space or slash
 * @returns split with space and begin with upper case
 */
export function toReadableCase(raw: string) {
  return raw
    .split(/ |-/)
    .map((a) => a[0].toUpperCase() + a.slice(1))
    .join(" ")
}

/**
 * Remove url unfriendly char
 * @param raw
 * @returns
 */
export function toUrlFriendlyCase(raw: string) {
  return raw.toLowerCase().replace(/[\s, /, ?, %, #, &, =]+/g, "-")
}
