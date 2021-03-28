import type { App } from "@vuepress/core"
import { initialzeViteBundlerConfig } from "./initialzeViteBundlerConfig"
import { initializeThemePages } from "./initializeThemePages"
import { initializeHomePage } from "./initializeHomePage"

export const onInitialized = async (app: App) => {
  initialzeViteBundlerConfig(app)
  initializeHomePage(app)
  await initializeThemePages(app)
}
