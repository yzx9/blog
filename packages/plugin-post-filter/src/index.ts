import { createPostFilter } from "./filter"
import type { App, Plugin, PluginFunction } from "@vuepress/core"
import type { PostFilterOptions } from "./type"

const name = "vuepress-plugin-post-filter"

/**
 * Post Filter for Vueress, Work for both mode
 * @param options
 * @returns
 */
export const VuepressPluginPostFilterRaw: PluginFunction<PostFilterOptions> = (
  options = {}
) => {
  const { frontmatter = { draft: true, published: false } } = options

  const filter = createPostFilter(frontmatter)

  const onInitialized = (app: App) => {
    app.pages = app.pages.filter(filter)
  }

  return {
    name,
    onInitialized,
  }
}

export const VuepressPluginPostFilter: Plugin<PostFilterOptions> = (
  options = {},
  app
) => {
  const { prodOnly = true } = options
  return prodOnly && app.env.isProd
    ? VuepressPluginPostFilterRaw(options, app)
    : { name }
}

export default VuepressPluginPostFilter
export * from "./type"
