export interface ThemeLocaleOptions {
  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[]

  /**
   * 404 page config
   *
   * Text of back-to-home link in 404 page
   */
  backToHome?: string[]

  /**
   * Translation for categories
   */
  categories?: Record<string, string>

  /**
   * Translation for tags
   */
  tags?: Record<string, string>
}

export interface ThemeOptions extends ThemeLocaleOptions {
  locales?: Record<string, ThemeLocaleOptions>
}
