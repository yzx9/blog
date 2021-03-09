import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "vuepress-theme-celesta"
import { translations } from "./translations"

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
    repo: "nsznsznjsz/blog",
    translations,
  },
}

export default config
