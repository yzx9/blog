import { defineConfigWithTheme } from "vitepress"
import { type Config } from "vitepress-theme-celesta"

export default defineConfigWithTheme<Config>({
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
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
