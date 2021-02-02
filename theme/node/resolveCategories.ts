import type { Categories, ThemeOptions } from "../types"
import { normalizeCategory } from "../utils"

export const resolveCategories = (options: ThemeOptions) => {
  options.categories = normalizeCategories(options.categories)
  for (let key in options.locales) {
    options.locales[key].categories = normalizeCategories(
      options.locales?.[key].categories
    )
  }
}

export const normalizeCategories = (categories: Categories = {}) => {
  const map: Categories = {}
  for (let key in categories) {
    map[normalizeCategory(key)] = categories[key]
  }
  return map
}
