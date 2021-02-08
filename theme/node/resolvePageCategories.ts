import { Page } from "@vuepress/core"
import {
  ThemeFrontmatter,
  ThemePageCategories,
  ThemePageCategory,
} from "../types"
import { normalizeCategoryOrTag } from "../utils"

const prefix = "/categories#"
const map = new Map<string, ThemePageCategory>()

export const resolvePageCategories = (
  page: Page & { frontmatter: ThemeFrontmatter }
): ThemePageCategories => {
  const raw = page.frontmatter.categories || "Default"

  const categoriesArray = Array.isArray(raw)
    ? raw.some(Array.isArray)
      ? raw.map((a) => (Array.isArray(a) ? a : [a]))
      : ([raw] as string[][])
    : [[raw]]

  const reducer = (parent: ThemePageCategory | null, raw: string) => {
    const name = normalizeCategoryOrTag(raw)
    const path = `${parent?.path ?? prefix}/${name}`
    const cur = map.get(path) || { raw, name, path, parent }
    map.set(path, cur)
    return cur
  }

  const categories = categoriesArray.map(
    (categories) => categories.reduce(reducer, null) as ThemePageCategory
  )

  return categories
}
