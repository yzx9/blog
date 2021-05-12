import { resolveCategories } from "./resolveCategories"
import type { App } from "@vuepress/core"

export const prepareCategories = async (app: App) => {
  const { pageToCategoriesMap } = resolveCategories(app)
  await app.writeTemp(
    "celesta/categories.js",
    `export const pageToCategoriesMap = ${JSON.stringify(pageToCategoriesMap)}`
  )
}
