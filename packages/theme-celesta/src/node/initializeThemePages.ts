import { createPage } from "@vuepress/core"
import type { App, PageOptions } from "@vuepress/core"

const initializeHomePage = async (app: App) => {
  if (app.pages.every((page) => page.path !== "/")) {
    const homepage = await createPage(app, {
      path: "/",
      content: "",
      frontmatter: {
        layout: "Homepage",
        shadowPage: true,
      },
    })
    app.pages.push(homepage)
  }
}

const pagesOptions: PageOptions[] = [
  {
    path: "/about.html",
    frontmatter: { layout: "About" },
  },
  {
    path: "/archives.html",
    frontmatter: { layout: "Archives" },
  },
  {
    path: "/categories.html",
    frontmatter: { layout: "Categories" },
  },
  {
    path: "/tags.html",
    frontmatter: { layout: "Tags" },
  },
]

const initializeAdditionalPages = async (app: App) => {
  const pages = await Promise.all(
    pagesOptions
      .filter((a) => app.pages.every((b) => a.path !== b.path))
      .map((a) =>
        createPage(app, {
          ...a,
          frontmatter: { ...a.frontmatter, shadowPage: true },
        })
      )
  )

  app.pages.push(...pages)
}

export const initializeThemePages = async (app: App) => {
  await Promise.all([initializeHomePage(app), initializeAdditionalPages(app)])
}
