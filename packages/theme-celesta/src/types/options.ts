import type { LocaleData, ThemeConfig } from "@vuepress/core"
import type { ThemeData as _ThemeData } from "@vuepress/plugin-theme-data"
import type { ISourceOptions } from "tsparticles"

export interface ThemeOptions extends ThemeConfig, ThemeLocaleOptions {}

export type ThemeLocaleOptions = ThemeData

export type ThemeData = _ThemeData<ThemeLocaleData>

export interface ThemeLocaleData extends LocaleData {
  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: string | null

  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: string | null

  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[]

  /**
   * 404 page config
   *
   * Texts of back-to-home link for 404 page
   */
  backToHome?: string[]

  /**
   * Translation for categories and tags
   */
  translations?: Record<string, string>

  /**
   * Page meta - edit lint config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean

  /**
   * Page meta - edit lint config
   *
   * The text to replace the default "Edit this page"
   */
  editLinkText?: string

  /**
   * Page meta - edit lint config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Page meta - edit lint config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string

  /**
   * Page meta - edit lint config
   *
   * Set this config if the branch of your docs is not 'main'
   */
  docsBranch?: string

  /**
   * Page meta - edit lint config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string

  /**
   * Options of particles
   *
   * See https://github.com/matteobruni/tsparticles
   */
  particles?: string | string[] | ISourceOptions | ISourceOptions[]
}
