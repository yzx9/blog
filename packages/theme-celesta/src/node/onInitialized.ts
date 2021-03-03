import type { App } from "@vuepress/core"
import { initializeThemePages } from "./initializeThemePages"
import { initializeHomePage } from "./initializeHomePage"

export const onInitialized = async (app: App) => {
  initializeHomePage(app)
  await initializeThemePages(app)
}
