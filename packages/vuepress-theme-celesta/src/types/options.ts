import type { LocaleData, ThemeConfig } from "@vuepress/core"
import type { ThemeData } from "@vuepress/plugin-theme-data"

export interface CelestaThemeOptions
  extends ThemeConfig,
    CelestaThemeLocaleOptions {
  themePlugins?: CelestaThemePluginsOptions
}

export interface CelestaThemePluginsOptions {}

export type CelestaThemeLocaleOptions = CelestaThemeData

export type CelestaThemeData = ThemeData<CelestaThemeLocaleData>

export interface CelestaThemeLocaleData extends LocaleData {
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
