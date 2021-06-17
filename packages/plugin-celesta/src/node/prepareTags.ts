import { resolveTags } from "./resolveTags"
import { generateTempContent } from "./utils"
import type { App } from "@vuepress/core"

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
