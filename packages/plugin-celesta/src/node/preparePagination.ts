import { resolvePageExcerpt } from "./resolvePageExcerpt"
import { generateTempContent, isPost } from "./utils"
import type { App } from "@vuepress/core"
import type { PaginationStorageDataSet } from "../types"

const resolvePaginationDataSet = (app: App): PaginationStorageDataSet =>
  app.pages
    .filter(isPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((a) => ({
      key: a.key,
      path: a.path,
      title: a.title,
      excerpt: resolvePageExcerpt(a),
    }))

export const preparePagination = async (app: App) => {
  const paginationDataSet = resolvePaginationDataSet(app)

  await app.writeTemp(
    "celesta/pagination.js",
    generateTempContent({
      key: `paginationDataSet`,
      value: paginationDataSet,
    })
  )
}
