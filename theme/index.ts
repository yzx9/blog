import { path } from "@vuepress/utils"
import type { Theme } from "@vuepress/core"
import { assignDefaultOptions, extendsPageData } from "./node"

export const theme: Theme = (themeConfig, ctx) => {
  assignDefaultOptions(themeConfig, ctx.options.lang)

  return {
    name: "vuepress-theme-celesta",
    layouts: path.resolve(__dirname, "./layouts"),
    clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.ts"),
    extendsPageData,
    plugins: ["@vuepress/plugin-debug"],
  }
}

export default theme
