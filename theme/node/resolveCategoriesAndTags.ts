import type { ThemeOptions } from "../types"
import { normalizeCategoryOrTag } from "../utils"

const resolveCategoriesOrTags = (attr: "categories" | "tags") => (
  options: ThemeOptions
) => {
  options[attr] = normalizeCategoriesOrTags(options[attr])
  for (let key in options.locales) {
    options.locales[key][attr] = normalizeCategoriesOrTags(
      options.locales?.[key][attr]
    )
  }
}

export const resolveCategories = resolveCategoriesOrTags("categories")
export const resolveTags = resolveCategoriesOrTags("tags")

const normalizeCategoriesOrTags = (source: Record<string, string> = {}) => {
  const map: Record<string, string> = {}
  for (let key in source) {
    map[normalizeCategoryOrTag(key)] = source[key]
  }
  return map
}
