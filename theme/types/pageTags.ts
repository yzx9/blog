export interface ThemePageTag {
  /**
   * Raw tag name in frontmatter
   */
  name: string

  /**
   * Tag slug
   */
  slug: string

  /**
   * path to tag, can be used as id
   */
  path: string
}

export type ThemePageTags = ThemePageTag[]
