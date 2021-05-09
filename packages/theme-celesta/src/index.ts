import { path } from "@vuepress/utils"
import { assignDefaultOptions, extendsPageOptions, onInitialized } from "./node"
import type { Theme } from "@vuepress/core"
import type { ThemeData } from "./types"

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
      ["vuepress-plugin-celesta", themeOptions],
      "vuepress-plugin-post-filter",
      "vuepress-plugin-math",
    ],

    layouts: path.resolve(__dirname, "./client/layouts"),

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      "./client/clientAppEnhance.ts"
    ),

    clientAppSetupFiles: path.resolve(__dirname, "./client/clientAppSetup.ts"),

    extendsPageOptions,

    onInitialized,
  }
}

export default VuepressThemeCelesta
export * from "./types"
