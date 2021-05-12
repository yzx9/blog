import { path } from "@vuepress/utils"
import { extendsPageData } from "./extendsPageData"
import { createPreparedHook } from "./prepare"
import type { Plugin } from "@vuepress/core"
import type { ThemeData } from "../types"

export const VuepressPluginCelesta: Plugin<ThemeData> = (options, app) => {
  return {
    name: "vuepress-plugin-celesta",
    clientAppSetupFiles: path.resolve(__dirname, "../client/clientAppSetup.js"),
    extendsPageData,
    onPrepared: createPreparedHook(options),
  }
}

export default VuepressPluginCelesta
export * from "../types"
