import { path } from "@vuepress/utils"
import { extendsMarkdown } from "./node"
import type { PluginObject } from "@vuepress/core"

export const VuepressPluginMath: PluginObject = {
  name: "vuepress-plugin-math",

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    "./client/clientAppEnhance.js"
  ),

  extendsMarkdown,
}

export default VuepressPluginMath
