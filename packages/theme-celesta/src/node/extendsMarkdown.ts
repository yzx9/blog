import { App } from "@vuepress/core"
import * as MarkdownIt from "markdown-it"
import MarkdownItTexmath from "markdown-it-texmath"
import katex from "katex"

export const extendsMarkdown = (md: MarkdownIt, app: App) => {
  md.use(MarkdownItTexmath, {
    engine: katex,
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  })
}
