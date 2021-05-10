import { Page } from "@vuepress/core"
import { ThemeFrontmatter, ThemePageTags } from "../types"
import { normalize } from "./utils"

export const resolvePageTags = (
  page: Page & { frontmatter: ThemeFrontmatter }
): ThemePageTags => {
  const tagsRaw = page.frontmatter.tags || ["Default"]
  const tagsArr = Array.isArray(tagsRaw) ? tagsRaw : [tagsRaw]
  const tags = tagsArr.map((name) => {
    const slug = normalize(name)

    return {
      name,
      slug,
      path: `/tags#${slug}`,
    }
  })

  return tags
}
