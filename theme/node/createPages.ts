import type { App } from "@vuepress/core"
import { createPage, PageOptions } from "@vuepress/core"

const pagesOptions: PageOptions[] = [
  {
    // TODO archives page
    path: "/archives.html",
    frontmatter: {
      layout: "Home",
    },
  },
  {
    // TODO categories page
    path: "/categories.html",
    frontmatter: {
      layout: "Home",
    },
  },
  {
    // TODO tags page
    path: "/tags.html",
    frontmatter: {
      layout: "Home",
    },
  },
]

export const createPages = async (app: App) => {
  const pages = await Promise.all(
    pagesOptions
      .filter((a) => app.pages.every((b) => a.path !== b.path))
      .map((a) => ({
        ...a,
        frontmatter: { ...a.frontmatter, shadowPage: true },
      }))
      .map((option) => createPage(app, option))
  )

  app.pages.push(...pages)
}
