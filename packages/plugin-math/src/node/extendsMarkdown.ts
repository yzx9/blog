import { math_plugin } from "./markdownItPlugin"
import type { App } from "@vuepress/core"
import type * as MarkdownIt from "markdown-it"

export const extendsMarkdown = (md: MarkdownIt, app: App) => {
  md.use(math_plugin)
}
