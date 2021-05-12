import { writeTranslations } from "./writeTranslations"
import { resolveCategories } from "./resolveCategories"
import { resolveTags } from "./resolveTags"
import type { App } from "@vuepress/core"
import type { ThemeData } from "@vuepress/plugin-theme-data"

const writeCategories = async (app: App) => {
  const { pageToCategoriesMap } = resolveCategories(app)
  await app.writeTemp(
    "celesta/categories.js",
    `export const pageToCategoriesMap = ${JSON.stringify(pageToCategoriesMap)}`
  )
}

const writeTags = async (app: App) => {
  const { tagToPagesMap, pageToTagsMap } = resolveTags(app)
  await app.writeTemp(
    "celesta/tags.js",
    [
      `export const tagToPagesMap = ${tagToPagesMap}`,
      `export const pageToTagsMap = ${pageToTagsMap}`,
    ].join(";")
  )
}

export const createPreparedHook = (options: ThemeData) => async (app: App) => {
  const promises = [
    writeTranslations(app, options),
    writeCategories(app),
    writeTags(app),
  ]
  await Promise.all(promises)
}
