import type { ThemeOptions } from "../types"
import { normalizeCategoryOrTag } from "../utils"

export const normalizeCategoriesOrTags = (raw: Record<string, string> = {}) =>
  Object.keys(raw).reduce((map, key) => {
    map[normalizeCategoryOrTag(key)] = raw[key]
    return map
  }, {})

const assignCategoriesOrTags = (attr: "categories" | "tags") => (
  options: ThemeOptions
) => {
  options[attr] = normalizeCategoriesOrTags(options[attr])
  for (let key in options.locales) {
    options.locales[key][attr] = normalizeCategoriesOrTags(
      options.locales?.[key][attr]
    )
  }
}

/**
 * assign locale categories map
 */
export const assignOptionCategories = assignCategoriesOrTags("categories")

/**
 * assign locale tags map
 */
export const assignOptionTags = assignCategoriesOrTags("tags")
