import type { PageData } from "@vuepress/client"
import { Page } from "@vuepress/core"
import type { ThemePageData } from "../../types"

export function isPost(page: Page): boolean
export function isPost(page: PageData): boolean
export function isPost(page: PageData<ThemePageData>): boolean

/**
 * Does this page is a post page
 * @param page test page
 */
export function isPost(page: Page | PageData) {
  return (
    !page.frontmatter.home &&
    !page.frontmatter.shadowPage &&
    page.path !== "/404.html"
  )
}
