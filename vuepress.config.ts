import { path } from "@vuepress/utils"
import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "./theme/types"

const FontPath = [
  "//fonts.googleapis.com/css?family=",
  "Monda:300,300italic,400,400italic,700,700italic|",
  "Roboto Slab:300,300italic,400,400italic,700,700italic|",
  "Microsoft YaHei:300,300italic,400,400italic,700,700italic|",
  "Kaushan Script:300,300italic,400,400italic,700,700italic|",
  "PT Mono:300,300italic,400,400italic,700,700italic&amp;subset=latin,latin-ext",
].join("")

const config: UserConfig<ThemeOptions> = {
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH || "/",
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "stylesheet", href: FontPath }],
  ],
  dest: "dist",
  temp: ".temp",
  cache: ".cache",
  public: "public",

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  plugins: [],

  theme: path.resolve(__dirname, "./theme/index.ts"),
  themeConfig: {
    categories: {
      "Computer Science": "计科",
      Network: "计算机网络",
      Coffee: "咖啡",
    },
    tags: {
      Network: "计算机网络",
    },
  },
}

export default config
