import { usePosts } from "./usePosts"
import { isReactive, ref, watch } from "vue"
import type { Ref } from "vue"
import type { PostData } from "./usePosts"

type PostFilter = (page: PostData) => boolean

export type PaginationOptions = {
  /**
   * current page
   */
  currentPage?: number

  /**
   * posts each page
   */
  pagination?: number

  /**
   * filter by tag path
   */
  tags?: string[]

  /**
   * filter by category path
   */
  categories?: string[]

  sort?: (a: PostData, b: PostData) => number

  filter?: PostFilter
}

const trueFn = () => true

/**
 * post pagination
 * @param options can be an reactive object or an plain object
 */
export const usePostsPagination = async (
  options: PaginationOptions = {}
): Promise<Ref<PostData[]>> => {
  const posts = await usePosts()
  const pagingRef = ref([] as PostData[])

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
      ? (page) => page.tags.some((a) => tags.includes(a.path))
      : trueFn
    const categoryFilter: PostFilter = categories.length
      ? (page) => page.categories.some((a) => categories.includes(a.path))
      : trueFn

    const current = posts
      .filter(tagFilter)
      .filter(categoryFilter)
      .filter(filter)
      .sort(sort)
      .slice((currentPage - 1) * pagination, currentPage * pagination)

    pagingRef.value = current
  }

  if (isReactive(options)) {
    watch(options, watchCallback, { immediate: true })
  } else {
    watchCallback()
  }

  return pagingRef
}
