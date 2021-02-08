import type { App } from "@vuepress/core"

/**
 * Remove pages
 * @param app
 */
export const initializePagesPath = (app: App) => {
  app.pages
    .filter((a) => !a.frontmatter.home)
    .filter((a) => !a.frontmatter.shadowPage)
    .filter((a) => a.path !== "/404.html")
    .forEach((a) => (a.path = `/posts/${a.slug}.html`))
}
