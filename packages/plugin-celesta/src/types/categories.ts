export type Category = {
  /**
   * Category slug, can be used as id
   */
  slug: string

  /**
   * Name of category
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

  /**
   * Amcestors of category
   *
   * Last of ancestors equals itself
   *
   * @example
   *
   * "foo/bar/baz".category => ["foo", "foo/bar", "foo/bar/baz"]
   */
  ancestors: Category[]

  /**
   * If this is root, parent should be null
   */
  parent: Category | null

  children: Category[]
}

export type Categories = Category[]

type Slug = string
type PagePath = string
type RawName = string

/**
 * Get the slugs of category by page path
 */
export type PageToCategoriesMap = Record<PagePath, Slug[]>

/**
 * Get the categories by slugs
 */
export type SlugToCategoryMap = Record<Slug, Categories>

/**
 * Get the raw name map by page path
 */
export type PageToRawNameMap = Record<PagePath, Record<Slug, RawName>>
