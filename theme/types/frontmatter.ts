export interface ThemeFrontmatter {
  /**
   * Format: yyyy-MM-dd
   */
  updated?: string

  /**
   * @example
   * categories: categories_1
   *
   * @example
   * categories:
   *   - categories_1
   *   - categories_2
   *
   * @example
   * categories:
   *   - - categories_1_1
   *     - categories_1_2
   *   - categories_2
   *
   * @example
   * categories:
   *   - [categories_1_1, categories_1_2]
   *   - categories_2
   */
  categories?: string | string[] | string[][] | (string | string[])[]

  tags?: string[]
}
