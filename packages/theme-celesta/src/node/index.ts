import { path } from "@vuepress/utils"
import { assignDefaultOptions } from "./assignDefaultOptions"
import { extendsPageOptions } from "./extendsPageOptions"
import { onInitialized } from "./onInitialized"
import type { Theme } from "@vuepress/core"
import type { ThemeData } from "../types"

export const VuepressThemeCelesta: Theme<ThemeData> = (themeOptions, app) => {
  assignDefaultOptions(themeOptions, app.options.lang)

  return {
    name: "vuepress-theme-celesta",

    plugins: [
      "@vuepress/plugin-debug",
      [
        "@vuepress/plugin-active-header-links",
        { headerLinkSelector: ".catalog__link" },
      ],
      ["@vuepress/theme-data", { themeData: themeOptions }],
      ["@celesta/vuepress-plugin-celesta", themeOptions],
      "@celesta/vuepress-plugin-post-filter",
      "@celesta/vuepress-plugin-math",
    ],

    layouts: path.resolve(__dirname, "../client/layouts"),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      "../client/clientAppEnhance.js"
    ),

    extendsPageOptions,

    onInitialized,
  }
}

export default VuepressThemeCelesta
export * from "../types"
