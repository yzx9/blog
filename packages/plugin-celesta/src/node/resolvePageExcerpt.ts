import * as removeMarkdown from "remove-markdown"
import type { Page } from "@vuepress/core"

const ExcerptLength = 200

export const resolvePageExcerpt = (page: Page) => {
  if (page.excerpt) return removeMarkdown(page.excerpt)

  const { content } = page
  if (!content) return ""

  const slice = content
    .trim()
    .replace(/^#+\s+(.*)/, "")
    .slice(0, ExcerptLength)

  const excerpt = removeMarkdown(slice) + " ..."

  return excerpt
}
