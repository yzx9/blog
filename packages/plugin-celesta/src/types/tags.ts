export interface Tag {
  /**
   * Slug of tag, can be used as id
   */
  slug: string

  /**
   * Name of tag
   *
   * Firstly inferred from the frontmatter
   *
   * Might be overright by translation
   */
  name: string

  /**
   * Page paths
   */
  pages: string[]
}

export type Tags = Tag[]

type Slug = string
type PagePath = string
type RawName = string

/**
 * Get tags by page path
 */
export type PageToTagsMap = Record<PagePath, Slug[]>

/**
 * Get the raw tag name map by page path
 */
export type PageToRawTagNameMap = Record<PagePath, Record<Slug, RawName>>
