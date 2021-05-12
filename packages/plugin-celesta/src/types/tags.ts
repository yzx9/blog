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

/**
 * Get path of pages by tag path
 */
export type TagToPagesMap = Record<string, string[]>

/**
 * Get tags by page path
 */
export type PageToTagsMap = Record<string, ThemePageTags>
