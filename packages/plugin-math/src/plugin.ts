import type { PluginObject } from "@vuepress/core"
import { path } from "@vuepress/utils"
import { extendsMarkdown } from "./node/extendsMarkdown"

export const texmathPlugin: PluginObject = {
  name: "vuepress-plugin-math",

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    "./client/clientAppEnhance.js"
  ),

  extendsMarkdown,
}
