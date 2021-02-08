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
   * Path to category
   */
  path: string

  /**
   * Category parent
   */
  parent: ThemePageCategory | null
}

export type ThemePageCategories = ThemePageCategory[]
