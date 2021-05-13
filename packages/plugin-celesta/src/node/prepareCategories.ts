import { resolveCategories } from "./resolveCategories"
import type { App } from "@vuepress/core"

export const prepareCategories = async (app: App) => {
  const { rootCategories, pageToCategoriesMap, pageToRawNameMap } =
    resolveCategories(app)

  await app.writeTemp(
    "celesta/categories.js",
    [
      `export const rootCategories = ${JSON.stringify(rootCategories)}`,
      `export const pageToCategoriesMap = ${JSON.stringify(
        pageToCategoriesMap
      )}`,
      `export const pageToRawNameMap = ${JSON.stringify(pageToRawNameMap)}`,
    ].join(";")
  )
}
