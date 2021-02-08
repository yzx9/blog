import { Page } from "@vuepress/core"
import { ThemeFrontmatter, ThemePageCategories } from "../types"
import { normalizeCategoryOrTag } from "../utils"

export const resolvePageCategories = (
  page: Page & { frontmatter: ThemeFrontmatter }
): ThemePageCategories => {
  const categoriesRaw = page.frontmatter.categories || ["Default"]

  const categoriesArr = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : [categoriesRaw]

  let path = "/categories#"
  const categories = categoriesArr.map((raw) => {
    const name = normalizeCategoryOrTag(raw)
    path = `${path}/${name}`

    return {
      raw,
      name,
      path,
    }
  })

  return categories
}
