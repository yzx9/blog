import { createPage } from "@vuepress/core"
import {
  resolveCategories,
  resolveTags,
} from "@celesta/vuepress-plugin-celesta"
import type { StorageCategory } from "@celesta/vuepress-plugin-celesta"
import type { App, PageOptions } from "@vuepress/core"

async function initializeHomePage(app: App) {
  return createPage(app, {
    path: "/",
    content: "",
    frontmatter: {
      layout: "Homepage",
      shadowPage: true,
    },
  })
}

async function initializeCategoryPages(app: App) {
  const slugs: string[] = []
  const walk = (category: StorageCategory) => {
    slugs.push(category.slug)
    category.children.forEach(walk)
  }

  const { rootCategories } = resolveCategories(app)
  rootCategories.forEach(walk)

  return Promise.all(
    slugs.map((a) =>
      createPage(app, {
        path: `/categories/${a}.html`,
        frontmatter: { layout: "Category", shadowPage: true },
      })
    )
  )
}

async function initializeTagPages(app: App) {
  const { tags } = resolveTags(app)
  return Promise.all(
    tags.map((a) =>
      createPage(app, {
        path: `/tags/${a.slug}.html`,
        frontmatter: { layout: "Tag", shadowPage: true },
      })
    )
  )
}
async function initializeAdditionalPages(app: App) {
  const pagesOptions: PageOptions[] = [
    { path: "/about.html", frontmatter: { layout: "About" } },
    { path: "/archives.html", frontmatter: { layout: "Archives" } },
    { path: "/categories.html", frontmatter: { layout: "Category" } },
    { path: "/tags.html", frontmatter: { layout: "Tag" } },
  ]

  return Promise.all(
    pagesOptions
      .filter((a) => app.pages.every((b) => a.path !== b.path))
      .map((a) =>
        createPage(app, {
          ...a,
          frontmatter: { ...a.frontmatter, shadowPage: true },
        })
      )
  )
}

export const initializeThemePages = async (app: App) => {
  const pages = await Promise.all([
    initializeHomePage(app),
    initializeCategoryPages(app),
    initializeTagPages(app),
    initializeAdditionalPages(app),
  ])

  const availablePages = pages
    .flat()
    .filter((a) => app.pages.every((b) => a.path !== b.path))

  app.pages.push(...availablePages)
}
