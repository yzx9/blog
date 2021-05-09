import { extendsPageData } from "./node"
import type { Plugin } from "@vuepress/core"
import type { ThemeData } from "./types"

export const VuepressPluginCelesta: Plugin<ThemeData> = (options, app) => {
  return {
    name: "vuepress-plugin-celesta",
    extendsPageData,
  }
}

export default VuepressPluginCelesta
export * from "./types"
