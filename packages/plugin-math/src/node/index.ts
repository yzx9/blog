import { path } from "@celesta/shared"
import { extendsMarkdown } from "./extendsMarkdown"
import type { PluginObject } from "@vuepress/core"

export const VuepressPluginMath: PluginObject = {
  name: "vuepress-plugin-math",

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    "../client/clientAppEnhance.js"
  ),

  extendsMarkdown,
}

export default VuepressPluginMath
