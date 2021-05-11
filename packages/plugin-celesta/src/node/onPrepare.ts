import { writeTranslations } from "./writeTranslations"
import { resolveTags } from "./resolveTags"
import { writeCategories } from "./resolveCategories"
import type { App } from "@vuepress/core"
import type { ThemeData } from "@vuepress/plugin-theme-data"

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
  const promises = [writeTranslations(app, options), writeTags(app)]
  await Promise.all(promises)
}
