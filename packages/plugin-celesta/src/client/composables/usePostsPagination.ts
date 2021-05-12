import { isReactive, reactive, watch } from "vue"
import { usePosts } from "./usePosts"
import { useMapFromCategoryToPosts } from "./useMapFromCategoryToPosts"
import { useMapFromTagToPosts } from "./useMapFromTagToPosts"
import type { PageData } from "../../types"

type PostFilter = (page: PageData) => boolean

export type PaginationOptions = {
  /**
   * Current page
   */
  currentPage?: number

  /**
   * Posts each page
   */
  pagination?: number

  /**
   * Filter by tag path
   */
  tags?: string[]

  /**
   * Filter by category path
   */
  categories?: string[]

  /**
   * @default Sort by date in desc
   */
  sort?: (a: PageData, b: PageData) => number

  /**
   * Custom filter
   */
  filter?: PostFilter
}

export type PaginationData = {
  posts: PageData[]
  total: number
}

const trueFn = () => true

/**
 * Post pagination
 * @param options Can be an plain object or an reactive object
 */
export const usePostsPagination = async (
  options: PaginationOptions = {}
): Promise<PaginationData> => {
  const posts = await usePosts()
  const tagMap = useMapFromTagToPosts()
  const categoryMap = useMapFromCategoryToPosts()
  const paginationData = reactive<PaginationData>({
    posts: [],
    total: posts.length,
  })

  const watchCallback = () => {
    const {
      currentPage = 1,
      pagination = 10,
      tags = [],
      categories = [],
      sort = (a, b) => Date.parse(b.date) - Date.parse(a.date),
      filter = trueFn,
    } = options

    const tagFilter: PostFilter = tags.length
      ? (page) => tagMap[page.path].some((a) => tags.includes(a))
      : trueFn

    const categoryFilter: PostFilter = categories.length
      ? (page) =>
          categoryMap[page.path].some((a) => categories.includes(a.slug))
      : trueFn

    const filteredPosts = posts
      .filter(filter)
      .filter(tagFilter)
      .filter(categoryFilter)

    const currentPosts = filteredPosts
      .sort(sort)
      .slice((currentPage - 1) * pagination, currentPage * pagination)

    paginationData.total = filteredPosts.length
    paginationData.posts = currentPosts
  }

  if (isReactive(options)) {
    watch(options, watchCallback, { immediate: true })
  } else {
    watchCallback()
  }

  return paginationData
}
