import type { LocaleData, ThemeConfig } from "@vuepress/core"
import type { ThemeData as _ThemeData } from "@vuepress/plugin-theme-data"

export interface ThemeOptions extends ThemeConfig, ThemeLocaleOptions {}

export type ThemeLocaleOptions = ThemeData

export type ThemeData = _ThemeData<ThemeLocaleData>

export interface ThemeLocaleData extends LocaleData {
  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[]

  /**
   * 404 page config
   *
   * Texts of back-to-home link in 404 page
   */
  backToHome?: string[]

  /**
   * Translation for categories and tags
   */
  translations?: Record<string, string>
}
