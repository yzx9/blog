import { normalizeCategoryOrTag } from "../client/utils"
import type { ThemeOptions } from "../types"

export const normalizeTranslations = (raw: Record<string, string> = {}) =>
  Object.keys(raw).reduce((map, key) => {
    map[normalizeCategoryOrTag(key)] = raw[key]
    return map
  }, {})

export const assignOptionTranslations = (options: ThemeOptions) => {
  const defaultTranslations = normalizeTranslations(options.translations)
  options.translations = defaultTranslations

  for (let key in options.locales) {
    options.locales[key].translations = Object.assign(
      {},
      defaultTranslations,
      normalizeTranslations(options.locales?.[key].translations)
    )
  }
}
