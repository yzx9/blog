export const normalize = (raw: string) =>
  raw.toLowerCase().replace(/[\s, /, ?, %, #, &, =]+/g, "-")
