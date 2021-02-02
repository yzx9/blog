export type Categories = {
  [category: string]: string
}

export interface ThemeOptions {
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
  categories?: Categories

  locales?: {
    [raw: string]: ThemeLocaleOptions
  }
}

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
  categories?: Categories
}

export type LocaleSet<T> = { [key: string]: T }
