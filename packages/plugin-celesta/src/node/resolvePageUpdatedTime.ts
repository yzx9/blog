import { getUpdatedTime } from "@vuepress/plugin-git"
import { normalizeDate } from "@celesta/shared"
import type { App, Page } from "@vuepress/core"
import type { ThemeFrontmatter } from "../types"

export const resolvePageUpdatedTime = async (
  page: Page & { frontmatter: ThemeFrontmatter },
  app: App
) => {
  const { date, filePathRelative } = page
  const cwd = app.dir.source()

  const updated =
    process.env.NODE_ENV !== "development" && filePathRelative !== null
      ? normalizeDate(await getUpdatedTime(filePathRelative, cwd))
      : date

  return updated
}
