import { isReactive, reactive, watch } from "vue"
import { paginationDataSet } from "@temp/celesta/pagination"
import type { Pagination, PaginationOptions } from "../../types"

/**
 * Post pagination
 * @param options Can be an plain object or an reactive object
 */
export function usePagination(options: PaginationOptions = {}): Pagination {
  const paginationData = reactive<Pagination>({
    pages: [],
    total: paginationDataSet.length,
  })

  const watchCallback = () => {
    const { currentPage = 1, pageSize: pagination = 10 } = options

    const currentPages = paginationDataSet.slice(
      (currentPage - 1) * pagination,
      currentPage * pagination
    )

    paginationData.pages = currentPages
  }

  if (isReactive(options)) {
    watch(options, watchCallback, { immediate: true })
  } else {
    watchCallback()
  }

  return paginationData
}
