import type { PluginObject } from "@vuepress/core"
import { path } from "@vuepress/utils"
import { extendsMarkdown } from "./extendsMarkdown"

export const texmathPlugin: PluginObject = {
  name: "vuepress-plugin-texmath",

  clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),

  extendsMarkdown,
}
