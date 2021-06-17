import { resolveCategories } from "./resolveCategories"
import { generateTempContent } from "./utils"
import type { App } from "@vuepress/core"

export const prepareCategories = async (app: App) => {
  const { rootCategories, pageToCategoriesMap, pageToRawCategoryNameMap } =
    resolveCategories(app)

  await app.writeTemp(
    "celesta/categories.js",
    generateTempContent([
      { key: `rootCategories`, value: rootCategories },
      { key: `pageToCategoriesMap`, value: pageToCategoriesMap },
      { key: `pageToRawCategoryNameMap`, value: pageToRawCategoryNameMap },
    ])
  )
}
