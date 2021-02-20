import { path } from "@vuepress/utils"
import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "./theme/types"

const config: UserConfig<ThemeOptions> = {
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH || "/",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
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
      "Computer Organization": "计组",
      "Data Structure": "数据结构",
      Network: "计算机网络",
      Life: "日常",
      Coffee: "咖啡",
    },
    tags: {
      Network: "计算机网络",
      "Computer Organization": "计组",
      "Data Structure": "数据结构",
      Coffee: "咖啡",
    },
  },
}

export default config
