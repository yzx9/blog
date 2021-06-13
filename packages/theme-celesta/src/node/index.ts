import { path } from "@vuepress/utils"
import { assignDefaultOptions } from "./assignDefaultOptions"
import { assignPostcssConfig } from "./assignPostcssConfig"
import { extendsPageOptions } from "./extendsPageOptions"
import { onInitialized } from "./onInitialized"
import type { Theme } from "@vuepress/core"
import type { ThemeData } from "../types"

export const VuepressThemeCelesta: Theme<ThemeData> = (themeOptions, app) => {
  assignDefaultOptions(app, themeOptions)
  assignPostcssConfig(app)

  const translations = themeOptions.translations
  const themeData = { ...themeOptions }
  Reflect.deleteProperty(themeData, "translations")

  return {
    name: "@celesta/vuepress-theme-celesta",

    plugins: [
      "@vuepress/plugin-debug",
      [
        "@vuepress/plugin-active-header-links",
        { headerLinkSelector: ".catalog__link" },
      ],
      ["@vuepress/theme-data", { themeData }],
      ["@celesta/vuepress-plugin-celesta", { translations }],
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
