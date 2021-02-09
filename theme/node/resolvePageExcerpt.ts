import { Page } from "@vuepress/core"

import removeMarkdown from "remove-markdown"

const ExcerptLength = 200

export const resolvePageExcerpt = (page: Page) => {
  if (page.excerpt) {
    return page.excerpt
  }

  const content = page.content
  if (!content) {
    return ""
  }

  const excerpt =
    removeMarkdown(
      content
        .trim()
        .replace(/^#+\s+(.*)/, "")
        .slice(0, ExcerptLength)
    ) + " ..."

  return excerpt
}
