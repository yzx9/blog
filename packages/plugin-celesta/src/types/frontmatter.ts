export interface ThemeFrontmatter {
  /**
   * Format: yyyy-MM-dd
   */
  updated?: string

  /**
   * @example
   * categories: category_1
   *
   * @example
   * categories:
   *   - category_1
   *   - category_2
   *
   * @example
   * categories:
   *   - - category_1_1
   *     - category_1_2
   *   - category_2
   *
   * @example
   * categories:
   *   - [category_1_1, category_1_2]
   *   - category_2
   */
  categories?: string | string[] | string[][] | (string | string[])[]

  tags?: string[]
}
