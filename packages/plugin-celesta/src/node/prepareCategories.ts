import { resolveCategories } from "./resolveCategories"
import type { App } from "@vuepress/core"

export const prepareCategories = async (app: App) => {
  const { rootCategories, pageToCategoriesMap, pageToRawCategoryNameMap } =
    resolveCategories(app)

  await app.writeTemp(
    "celesta/categories.js",
    [
      `export const rootCategories = ${JSON.stringify(rootCategories)}`,
      `export const pageToCategoriesMap = ${JSON.stringify(
        pageToCategoriesMap
      )}`,
      `export const pageToRawCategoryNameMap = ${JSON.stringify(
        pageToRawCategoryNameMap
      )}`,
    ].join(";")
  )
}
