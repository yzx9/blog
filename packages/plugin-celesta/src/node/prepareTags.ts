import { resolveTags } from "./resolveTags"
import type { App } from "@vuepress/core"
import { generateTempContent } from "./utils/generateTempContent"

export const prepareTags = async (app: App) => {
  const { tags, pageToTagsMap, pageToRawTagNameMap } = resolveTags(app)
  await app.writeTemp(
    "celesta/tags.js",
    generateTempContent([
      { key: `tags`, value: tags },
      { key: `pageToTagsMap`, value: pageToTagsMap },
      { key: `pageToRawTagNameMap`, value: pageToRawTagNameMap },
    ])
  )
}
