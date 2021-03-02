import type { App, Page, PluginFunction } from "@vuepress/core"
import { PostFilterOptions } from "./type"

const name = "vuepress-plugin-post-filter"

export const createPostFilter = (frontmatter: Record<string, any>) => {
  const testFns = Object.keys(frontmatter).map((key) => (a: Page) =>
    a.frontmatter[key] !== frontmatter[key]
  )

  return (page: Page) => testFns.every((fn) => fn(page))
}

export const postFilterPluginRaw: PluginFunction = (
  options: PostFilterOptions = {}
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

export const postFilterPlugin: PluginFunction = (
  options: PostFilterOptions = {},
  app
) => {
  const { prodOnly = true } = options
  return prodOnly && app.env.isProd
    ? postFilterPluginRaw(options, app)
    : { name }
}
