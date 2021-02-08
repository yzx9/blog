import type { App } from "@vuepress/core"
import { initializeThemePages } from "./initializeThemePages"
import { initializePagesPath } from "./initializePagesPath"
import { initializeHomePage } from "./initializeHomePage"

export const onInitialized = async (app: App) => {
  initializePagesPath(app)
  initializeHomePage(app)
  await initializeThemePages(app)
}
