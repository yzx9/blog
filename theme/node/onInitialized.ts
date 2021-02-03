import type { App } from "@vuepress/core"
import { createPages } from "./createPages"
import { resolvePageRoutes } from "./resolvePageRoutes"

export const onInitialized = async (app: App) => {
  resolvePageRoutes(app)
  await createPages(app)
}
