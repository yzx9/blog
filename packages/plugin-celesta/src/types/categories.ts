export type Category = {
  /**
   * Category slug, can be used as id
   */
  slug: string

  /**
   * Display name
   */
  name: string

  /**
   * Raw category name in frontmatter
   */
  raw: string

  /**
   * Page paths
   */
  pages: string[]

  parent: Category | null
  ancestors: Category[]
  children: Category[]
}

/**
 * Get the categories by category path
 */
export type PageToCategoriesMap = Record<string, Category[]>
