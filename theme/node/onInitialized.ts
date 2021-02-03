import type { App } from "@vuepress/core"
import { createHomePage } from "./createHomePage"
import { createArchivesPage } from "./createArchivesPage"
import { createCategoriesPages } from "./createCategoriesPage"
import { createTagsPage } from "./createTagsPage"
import { resolvePageRoutes } from "./resolvePageRoutes"

export const onInitialized = async (app: App) => {
  resolvePageRoutes(app)

  createHomePage(app)
  createArchivesPage(app)
  createCategoriesPages(app)
  createTagsPage(app)
}
