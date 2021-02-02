export const normalizeCategory = (raw: string) =>
  raw.toLowerCase().replace(/\s+/g, "-")
