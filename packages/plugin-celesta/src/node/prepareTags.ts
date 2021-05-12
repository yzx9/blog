import { resolveTags } from "./resolveTags"
import type { App } from "@vuepress/core"

export const prepareTags = async (app: App) => {
  const { tagToPagesMap, pageToTagsMap } = resolveTags(app)
  await app.writeTemp(
    "celesta/tags.js",
    [
      `export const tagToPagesMap = ${JSON.stringify(tagToPagesMap)}`,
      `export const pageToTagsMap = ${JSON.stringify(pageToTagsMap)}`,
    ].join(";")
  )
}
