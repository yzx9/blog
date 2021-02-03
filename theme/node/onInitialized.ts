import type { App } from "@vuepress/core"
import { createPages } from "./createPages"
import { resolvePageRoutes } from "./resolvePageRoutes"
import { resolveHomePage } from "./resolveHomePage"

export const onInitialized = async (app: App) => {
  resolvePageRoutes(app)
  resolveHomePage(app)
  await createPages(app)
}
