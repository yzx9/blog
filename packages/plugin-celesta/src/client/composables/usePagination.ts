import {
  computed,
  isReactive,
  isRef,
  reactive,
  readonly,
  ref,
  unref,
  watch,
} from "vue"
import { useCategories } from "./useCategories"
import { useTags } from "./useTags"
import { paginationDataSet as _paginationDataSet } from "@temp/celesta/pagination"
import { pageToCategoriesMap } from "@temp/celesta/categories"
import { pageToTagsMap } from "@temp/celesta/tags"
import type { Ref } from "vue"
import type {
  Pagination,
  PaginationDataSet,
  PaginationOptions,
  PaginationStorageDataSet,
} from "../../types"

const paginationDataSet = ref(extendsPaginationData(_paginationDataSet))

const trueFn = () => true
const wrapToArray = <T>(raw: T | T[]) => (Array.isArray(raw) ? raw : [raw])

/**
 * Post pagination
 * @param options Can be an plain object or an reactive object
 */
export function usePagination(
  options: PaginationOptions | Ref<PaginationOptions> = {}
): Pagination {
  const { allCategories } = useCategories()
  const { allTags } = useTags()

  const pages = computed(() => {
    const { categories: _categories = [], tags: _tags = [] } = unref(options)

    const categories = wrapToArray(_categories)
    const tags = wrapToArray(_tags)

    const filterByCategories = categories.length
      ? (slug: string) => categories?.includes(slug)
      : trueFn

    const filterByTags = tags.length
      ? (slug: string) => tags?.includes(slug)
      : trueFn

    return paginationDataSet.value
      .filter((a) => a.categories.some(filterByCategories))
      .filter((a) => a.tags.some(filterByTags))
  })

  const paginationData = reactive({
    pages: [] as PaginationDataSet,
    total: computed(() => pages.value.length),
  })

  const watchCallback = () => {
    const {
      currentPage = 1,
      pageSize: pagination = 10,
      categories: _categories = [],
      tags: _tags = [],
    } = unref(options)

    const currentPages = pages.value
      .slice((currentPage - 1) * pagination, currentPage * pagination)
      .map((page) => ({
        ...page,
        categories: page.categories.map(
          (a) => allCategories.value.find((b) => b.slug === a)!
        ),
        tags: page.tags.map((a) => allTags.value.find((b) => b.slug === a)!),
      }))

    paginationData.pages = currentPages
  }

  if (isReactive(options) || isRef(options)) {
    watch(options, watchCallback, { immediate: true })
  } else {
    watchCallback()
  }

  return readonly(paginationData)
}

function extendsPaginationData(paginationDataSet: PaginationStorageDataSet) {
  return paginationDataSet.map((page) => ({
    ...page,
    categories: pageToCategoriesMap?.[page.path],
    tags: pageToTagsMap?.[page.path],
  }))
}
