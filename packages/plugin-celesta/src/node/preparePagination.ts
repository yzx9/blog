import { isPost } from "./utils"
import { PaginationDataSet } from "../types"
import { resolvePageExcerpt } from "./resolvePageExcerpt"
import type { App } from "@vuepress/core"

const resolvePaginationDataSet = (app: App): PaginationDataSet =>
  app.pages
    .filter(isPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((a) => ({
      path: a.path,
      title: a.title,
      excerpt: resolvePageExcerpt(a),
    }))

export const preparePagination = async (app: App) => {
  const paginationDataSet = resolvePaginationDataSet(app)

  await app.writeTemp(
    "celesta/pagination.js",
    `export const paginationDataSet = ${JSON.stringify(paginationDataSet)}`
  )
}
