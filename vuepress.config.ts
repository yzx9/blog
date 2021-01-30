import path from "path"
import type { UserConfig } from "@vuepress/cli"
import type { ThemeOptions } from "./theme/types"

const config: UserConfig<ThemeOptions> = {
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH ?? "/",

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
  themeConfig: {},
}

export default config
