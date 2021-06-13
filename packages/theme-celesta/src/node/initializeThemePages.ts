import { createPage } from "@vuepress/core"
import { resolveTags } from "@celesta/vuepress-plugin-celesta"
import type { App, PageOptions } from "@vuepress/core"

const initializeHomePage = async (app: App) => {
  const homepage = await createPage(app, {
    path: "/",
    content: "",
    frontmatter: {
      layout: "Homepage",
      shadowPage: true,
    },
  })
  return homepage
}

const initializeTagPages = async (app: App) => {
  const { tags } = resolveTags(app)
  const pages = await Promise.all(
    tags.map((a) =>
      createPage(app, {
        path: `/tags/${a.slug}.html`,
        frontmatter: { layout: "Tag", shadowPage: true },
      })
    )
  )
  return pages
}

const initializeAdditionalPages = async (app: App) => {
  const pagesOptions: PageOptions[] = [
    { path: "/about.html", frontmatter: { layout: "About" } },
    { path: "/archives.html", frontmatter: { layout: "Archives" } },
    { path: "/categories.html", frontmatter: { layout: "Categories" } },
    { path: "/tags.html", frontmatter: { layout: "Tag" } },
  ]

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

  return pages
}

export const initializeThemePages = async (app: App) => {
  const pages = await Promise.all([
    initializeHomePage(app),
    initializeTagPages(app),
    initializeAdditionalPages(app),
  ])

  const availablePages = pages
    .flat()
    .filter((a) => app.pages.every((b) => a.path !== b.path))

  app.pages.push(...availablePages)
}
