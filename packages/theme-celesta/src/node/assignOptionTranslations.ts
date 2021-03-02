import { normalizeCategoryOrTag } from "../utils"
import type { ThemeOptions } from "../types"

export const normalizeCategoriesOrTags = (raw: Record<string, string> = {}) =>
  Object.keys(raw).reduce((map, key) => {
    map[normalizeCategoryOrTag(key)] = raw[key]
    return map
  }, {})

export const assignOptionTranslations = (options: ThemeOptions) => {
  options.translations = normalizeCategoriesOrTags(options.translations)
  for (let key in options.locales) {
    options.locales[key].translations = normalizeCategoriesOrTags(
      options.locales?.[key].translations
    )
  }
}
