export interface ThemePageTag {
  /**
   * Raw tag in frontmatter
   */
  raw: string

  /**
   * Normalized tag name
   */
  name: string

  /**
   * path to tag
   */
  path: string
}

export type ThemePageTags = ThemePageTag[]
