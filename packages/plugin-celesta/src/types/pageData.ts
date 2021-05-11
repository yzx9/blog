import type { PageData as _PageData } from "@vuepress/client"
import type { GitData } from "@vuepress/plugin-git"
import type { ThemePageCategories } from "./pageCategories"
import type { ThemePageTags } from "./pageTags"

export type PageData = _PageData<ThemePageData>

export interface ThemePageData {
  /**
   * Format: yyyy-MM-dd
   */
  date: string

  /**
   * Format: yyyy-MM-dd
   */
  updated: string

  /**
   * Page file relative path
   */
  filePathRelative: string | null

  /**
   * Page categories
   */
  categories: ThemePageCategories

  /**
   * Support by @vuepress/plugin-git
   *
   * Disable in dev mode
   */
  git?: GitData
}
