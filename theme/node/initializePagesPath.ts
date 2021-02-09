import type { App } from "@vuepress/core"
import { isPost } from "../utils"

/**
 * Remove pages
 * @param app
 */
export const initializePagesPath = (app: App) => {
  app.pages.filter(isPost).forEach((a) => (a.path = `/posts/${a.slug}.html`))
}
