import { createPage } from "@vuepress/core"
import type { App, PageOptions } from "@vuepress/core"

const pagesOptions: PageOptions[] = [
  {
    path: "/about.html",
    frontmatter: {
      layout: "About",
    },
  },
  {
    path: "/archives.html",
    frontmatter: {
      layout: "Archives",
    },
  },
  {
    path: "/categories.html",
    frontmatter: {
      layout: "Categories",
    },
  },
  {
    path: "/tags.html",
    frontmatter: {
      layout: "Tags",
    },
  },
]

export const initializeThemePages = async (app: App) => {
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
