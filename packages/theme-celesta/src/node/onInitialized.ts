import { initializeThemePages } from "./initializeThemePages"
import type { App } from "@vuepress/core"

export const onInitialized = async (app: App) => {
  await initializeThemePages(app)
}
