export interface ThemePageCategory {
  /**
   * Raw category name in frontmatter
   */
  raw: string

  /**
   * Normalized category name
   */
  name: string

  /**
   * path to category
   */
  path: string
}

export type ThemePageCategories = ThemePageCategory[]

export type ThemePageMultiCategories = ThemePageCategories[]
