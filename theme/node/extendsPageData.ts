import type { Page, App } from "@vuepress/core"
import type { ThemeFrontmatter, ThemePageData } from "../types"
import { resolvePageCategories } from "./resolvePageCategories"
import { resolvePageTags } from "./resolvePageTags"
import { resolvePageUpdatedTime } from "./resolvePageUpdatedTime"

type PageWithFrontmatter = Page & { frontmatter: ThemeFrontmatter }
type PageExtended = Partial<PageWithFrontmatter> & ThemePageData

export const extendsPageData = async (
  page: PageWithFrontmatter,
  app: App
): Promise<PageExtended> => {
  const { date, frontmatter } = page
  const title = frontmatter.title || page.title
  const updated = await resolvePageUpdatedTime(page, app)
  const categories = resolvePageCategories(page)
  const tags = resolvePageTags(page)

  return {
    title,
    date,
    updated,
    categories,
    tags,
  }
}
