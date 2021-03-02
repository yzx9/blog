export interface ThemePageCategory {
  /**
   * Raw category name in frontmatter
   */
  name: string

  /**
   * Category slug
   */
  slug: string

  /**
   * Path to category, can be used as id
   */
  path: string

  /**
   * Category parent
   */
  parent: ThemePageCategory | null
}

export type ThemePageCategories = ThemePageCategory[]
