import { path } from "@vuepress/utils"
import type { Theme } from "@vuepress/core"
import { assignDefaultOptions, extendsPageData, onInitialized } from "./node"

export const theme: Theme = (themeConfig, app) => {
  assignDefaultOptions(themeConfig, app.options.lang)

  return {
    name: "vuepress-theme-celesta",
    layouts: path.resolve(__dirname, "./layouts"),
    clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.ts"),
    extendsPageData,
    plugins: [
      "@vuepress/plugin-debug",
      [
        "@vuepress/plugin-active-header-links",
        { headerLinkSelector: ".catalog__link" },
      ],
      "vuepress-plugin-post-filter",
    ],
    onInitialized,
  }
}

export default theme
