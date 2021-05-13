import { resolveTags } from "./resolveTags"
import type { App } from "@vuepress/core"

export const prepareTags = async (app: App) => {
  const { tags, pageToTagsMap, pageToRawTagNameMap } = resolveTags(app)
  await app.writeTemp(
    "celesta/tags.js",
    [
      `export const tags = ${JSON.stringify(tags)}`,
      `export const pageToTagsMap = ${JSON.stringify(pageToTagsMap)}`,
      `export const pageToRawTagNameMap = ${JSON.stringify(
        pageToRawTagNameMap
      )}`,
    ].join(";")
  )
}
