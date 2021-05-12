import { isPost, normalizeString } from "./utils"
import type { App, Page } from "@vuepress/core"
import type { Category, PageToCategoriesMap, ThemeFrontmatter } from "../types"

let resolved = false
const pageToCategoriesMap: PageToCategoriesMap = {}
const categoryMap: Record<string, Category> = {}

const resovePageCategories = (
  page: Page & { frontmatter: ThemeFrontmatter }
) => {
  const raw = page.frontmatter.categories || "Default"
  const categoriesRoutes = Array.isArray(raw)
    ? raw.some(Array.isArray)
      ? raw.map((a) => (Array.isArray(a) ? a : [a]))
      : ([raw] as string[][])
    : [[raw]]

  const reducer = (parent: Category | null, name: string) => {
    const prefix = parent?.slug ?? "/categories#"
    const slug = `${prefix}/${normalizeString(name)}`
    const cur: Category = categoryMap[slug] || {
      raw: name,
      slug,
      name,
      pages: [],
      parent: null, // filled in client side
      ancestors: [], // filled in client side
      children: [],
    }
    categoryMap[slug] = cur
    cur.pages.push(page.path)
    parent?.children.push(cur)
    return cur
  }

  const categories = categoriesRoutes.map((route) =>
    route.reduce(reducer, null)
  ) as Category[]

  pageToCategoriesMap[page.path] = categories

  return categories
}

const _resolveCategories = (app: App) =>
  app.pages.filter(isPost).forEach(resovePageCategories)

export const resolveCategories = (app: App) => {
  if (!resolved) _resolveCategories(app)
  resolved = true
  return { pageToCategoriesMap }
}
