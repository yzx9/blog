import { isPost, normalizeString } from "./utils"
import type { App, Page } from "@vuepress/core"
import type {
  PageToRawTagNameMap,
  PageToTagsMap,
  Tags,
  ThemeFrontmatter,
} from "../types"

let resolved = false
const tags: Tags = []
const pageToTagsMap: PageToTagsMap = {}
const pageToRawTagNameMap: PageToRawTagNameMap = {}

const resolvePageTags = (page: Page & { frontmatter: ThemeFrontmatter }) => {
  const rawNameMap: Record<string, string> = {}
  const raw = page.frontmatter.tags || ["Default"]
  const arr = Array.isArray(raw) ? raw : [raw]
  const currentTags = arr.map((raw) => {
    const slug = normalizeString(raw)
    let tag = tags.find((a) => a.slug === slug)
    if (!tag) {
      tag = {
        slug,
        name: "",
        pages: [], // filled in client side
      }
      tags.push(tag)
    }
    tag.pages.push(page.path)
    rawNameMap[slug] = raw
    return tag
  })
  pageToRawTagNameMap[page.path] = rawNameMap
  pageToTagsMap[page.path] = currentTags.map((a) => a.slug)
}

const _resolveTags = (app: App) =>
  app.pages.filter(isPost).forEach(resolvePageTags)

export const resolveTags = (app: App) => {
  if (!resolved) _resolveTags(app)
  resolved = true
  return { tags, pageToTagsMap, pageToRawTagNameMap }
}
