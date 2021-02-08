import type { Page, App } from "@vuepress/core"
import type { ThemeFrontmatter, ThemePageData } from "../types"
import { resolveUpdatedTime } from "./resolveUpdatedTime"

export const extendsPageData = async (
  page: Page & { frontmatter: ThemeFrontmatter },
  app: App
): Promise<ThemePageData> => {
  const { date, frontmatter } = page

  const updated = await resolveUpdatedTime(page, app)

  const categoriesRaw = frontmatter.categories || ["Default"]
  const categories = Array.isArray(categoriesRaw)
    ? categoriesRaw
    : [categoriesRaw]

  const tagsRaw = frontmatter.tags || ["Default"]
  const tags = Array.isArray(tagsRaw) ? tagsRaw : [tagsRaw]

  return {
    date,
    updated,
    categories,
    tags,
  }
}
