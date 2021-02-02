import type { GitData } from "@vuepress/plugin-git"

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
   * Raw categories, without normalize and localize
   */
  categories: string[]

  /**
   * Raw tags, without normalize and localize
   */
  tags: string[]

  /**
   * Support by @vuepress/plugin-git
   *
   * Disable in dev mode
   */
  git?: GitData
}
