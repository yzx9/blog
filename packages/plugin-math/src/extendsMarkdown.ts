import type { App } from "@vuepress/core"
import type * as MarkdownIt from "markdown-it"
import * as MarkdownItKatex from "@iktakahiro/markdown-it-katex"

export const extendsMarkdown = (md: MarkdownIt, app: App) => {
  md.use(MarkdownItKatex)
}
