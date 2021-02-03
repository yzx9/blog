import type { App } from "@vuepress/core"
import { createPage } from "@vuepress/core"

const pagesOptions = [
  {
    path: "/",
    frontmatter: {
      layout: "Home",
    },
  },
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
    pagesOptions.map((a) =>
      createPage(app, {
        path: "/categories.html",
        frontmatter: {
          layout: "Home",
        },
      })
    )
  )

  app.pages.push(...pages)
}
