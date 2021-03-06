import type { App } from "@vuepress/core"
import type * as MarkdownIt from "markdown-it"
import * as MarkdownItTexmath from "markdown-it-texmath"
import katex from "katex"

export const extendsMarkdown = (md: MarkdownIt, app: App) => {
  md.use(MarkdownItTexmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  })
}
