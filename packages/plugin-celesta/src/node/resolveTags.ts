import { isPost, toUrlFriendlyCase } from "@celesta/shared"
import type { App, Page } from "@vuepress/core"
import type {
  PageToRawTagNameMap,
  PageToTagsMap,
  StorageTags,
  ThemeFrontmatter,
} from "../types"

type TagResolvedData = {
  tags: StorageTags
  pageToTagsMap: PageToTagsMap
  pageToRawTagNameMap: PageToRawTagNameMap
}

const cache = new WeakMap<App, TagResolvedData>()

const _resolveTags = (app: App) => {
  const data: TagResolvedData = {
    tags: [],
    pageToTagsMap: {},
    pageToRawTagNameMap: {},
  }

  const resolvePageTags = (page: Page & { frontmatter: ThemeFrontmatter }) => {
    const rawNameMap: Record<string, string> = {}
    const raw = page.frontmatter.tags || ["Default"]
    const arr = Array.isArray(raw) ? raw : [raw]
    const currentTags = arr.map((raw) => {
      const slug = toUrlFriendlyCase(raw)
      let tag = data.tags.find((a) => a.slug === slug)
      if (!tag) {
        tag = { slug, pages: [] }
        data.tags.push(tag)
      }
      tag.pages.push(page.path)
      rawNameMap[slug] = raw
      return tag
    })
    data.pageToRawTagNameMap[page.path] = rawNameMap
    data.pageToTagsMap[page.path] = currentTags.map((a) => a.slug)
  }

  app.pages.filter(isPost).forEach(resolvePageTags)
  cache.set(app, data)
}

export const resolveTags = (app: App): TagResolvedData => {
  if (!cache.has(app)) _resolveTags(app)
  const data = cache.get(app)!
  return data
}
