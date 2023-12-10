import { defineConfigWithTheme } from "vitepress"
import { withMermaid } from "vitepress-plugin-mermaid"
import { type Config } from "vitepress-theme-celesta"

export default withMermaid(
  defineConfigWithTheme<Config>({
    head: [["link", { rel: "icon", href: "/logo.ico" }]],
    markdown: {
      math: true,
    },
    locales: {
      root: {
        label: "中文",
        lang: "zh",
        title: "Zexin Yuan's blog",
        description: "Technique && Life",
        themeConfig: {
          author: "Zexin Yuan",
        },
      },
    },
  })
)
