import type { Page } from "@vuepress/core"

const name = "vuepress-plugin-post-filter"

export const createPostFilter = (frontmatter: Record<string, any>) => {
  const testFns = Object.keys(frontmatter).map((key) => (a: Page) =>
    a.frontmatter[key] !== frontmatter[key]
  )

  return (page: Page) => testFns.every((fn) => fn(page))
}
