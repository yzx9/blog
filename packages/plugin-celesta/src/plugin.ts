import { extendsPageData } from "./node"
import type { Plugin } from "@vuepress/core"

export const plugin: Plugin<{}> = (options, app) => {
  return {
    name: "vuepress-plugin-celesta",
    extendsPageData,
  }
}
