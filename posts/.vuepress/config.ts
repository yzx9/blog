import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "vuepress-theme-celesta"

const config: UserConfig<ThemeOptions> = {
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

  plugins: [],

  theme: "vuepress-theme-celesta",
  themeConfig: {
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
}

export default config
