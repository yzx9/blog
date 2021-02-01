import { path } from "@vuepress/utils"
import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "./theme/types"

const config: UserConfig<ThemeOptions> = {
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH ?? "/",
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
      "Computer Science": "CS",
    },
  },
}

export default config
