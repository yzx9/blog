import { resolve } from "path"
import type { Theme } from "@vuepress/core"
import { assignDefaultOptions } from "./node"
import extendsMarkdown from "./extendsMarkdown"
import extendsPageData from "./extendsPageData"

export const theme: Theme = (themeConfig, ctx) => {
  assignDefaultOptions(themeConfig, ctx.options.lang)

  return {
    name: "vuepress-theme-celesta",
    layouts: resolve(__dirname, "./layouts"),
    clientAppEnhanceFiles: resolve(__dirname, "./clientAppEnhance.ts"),
    clientAppSetupFiles: resolve(__dirname, "./clientAppSetup.ts"),
    extendsMarkdown,
    extendsPageData,
    plugins: [
      ["@vuepress/plugin-debug"]
    ],
  }
}

export default theme
