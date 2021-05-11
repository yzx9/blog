export interface ThemePageTag {
  name: string
  slug: string

  /**
   * Raw tag name in frontmatter
   */
  raw: string

  /**
   * path to tag, can be used as id
   */
  path: string
}

export type ThemePageTags = ThemePageTag[]
