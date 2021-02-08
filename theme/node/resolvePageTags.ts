import { Page } from "@vuepress/core"
import { ThemeFrontmatter, ThemePageTags } from "../types"
import { normalizeCategoryOrTag } from "../utils"

export const resolvePageTags = (
  page: Page & { frontmatter: ThemeFrontmatter }
): ThemePageTags => {
  const tagsRaw = page.frontmatter.tags || ["Default"]
  const tagsArr = Array.isArray(tagsRaw) ? tagsRaw : [tagsRaw]
  const tags = tagsArr.map((raw) => {
    const name = normalizeCategoryOrTag(raw)

    return {
      raw,
      name,
      path: `/tags#${name}`,
    }
  })

  return tags
}
