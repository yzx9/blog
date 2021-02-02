export const normalizeCategoryOrTag = (raw: string) =>
  raw.toLowerCase().replace(/[\s, /, ?, %, #, &, =]+/g, "-")
