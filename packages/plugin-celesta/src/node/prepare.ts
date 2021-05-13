import { prepareTranslations } from "./prepareTranslations"
import { prepareCategories } from "./prepareCategories"
import { prepareTags } from "./prepareTags"
import { preaprePagination } from "./preaprePagination"
import type { App } from "@vuepress/core"
import type { ThemeData } from "@vuepress/plugin-theme-data"

export const createPreparedHook = (options: ThemeData) => async (app: App) => {
  const promises = [
    prepareTranslations(app, options),
    prepareCategories(app),
    prepareTags(app),
    preaprePagination(app),
  ]
  await Promise.all(promises)
}
