import { isPost, normalizeString } from "./utils"
import type { App, Page } from "@vuepress/core"
import type { PageToTagsMap, TagToPagesMap, ThemeFrontmatter } from "../types"

let resolved = false
const tagToPagesMap: TagToPagesMap = {}
const pageToTagsMap: PageToTagsMap = {}

const resolvePageTags = (page: Page & { frontmatter: ThemeFrontmatter }) => {
  const tagsRaw = page.frontmatter.tags || ["Default"]
  const tagsArr = Array.isArray(tagsRaw) ? tagsRaw : [tagsRaw]
  const tags = tagsArr.map((name) => {
    const slug = normalizeString(name)
    const path = `/tags#${slug}`
    if (!tagToPagesMap[path]) tagToPagesMap[path] = []
    tagToPagesMap[path].push(page.path)
    return { name, slug, path }
  })
  pageToTagsMap[page.path] = tags
}

const _resolveTags = (app: App) =>
  app.pages.filter(isPost).forEach(resolvePageTags)

export const resolveTags = (app: App) => {
  if (!resolved) _resolveTags(app)
  resolved = true
  return { tagToPagesMap, pageToTagsMap }
}
