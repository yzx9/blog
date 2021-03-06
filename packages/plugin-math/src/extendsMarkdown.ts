import type { App } from "@vuepress/core"
import type * as MarkdownIt from "markdown-it"
import { math_plugin } from "./markdownItPlugin"

export const extendsMarkdown = (md: MarkdownIt, app: App) => {
  md.use(math_plugin)
}
