import type { Page } from "@vuepress/core"
import type { PageData } from "@vuepress/client"

/**
 * Does this page is a post page
 * @param page test page
 */
export function isPost(page: Page | PageData) {
  return !page.frontmatter.shadowPage && page.path !== "/404.html"
}
