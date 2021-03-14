import { defineUserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "vuepress-theme-celesta"

export default defineUserConfig<ThemeOptions>({
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH || "/",
  head: [["link", { rel: "icon", href: `/logo.png` }]],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  bundler:
    process.env.NODE_ENV === "production"
      ? "@vuepress/webpack"
      : "@vuepress/vite",

  plugins: [],

  theme: "vuepress-theme-celesta",
  themeConfig: {
    repo: "nsznsznjsz/blog",

    translations: {
      "Computer Science": "计科",
      "Computer Organization": "计组",
      "Data Structure": "数据结构",
      Tree: "树",
      Network: "计算机网络",
      Life: "日常",
      Coffee: "咖啡",
      Default: "默认",
    },
  },
})
