import type { App } from "@vuepress/core"

export const initializeHomePage = (app: App) => {
  app.pages.filter((a) => a.frontmatter.home).forEach((a) => (a.frontmatter.layout = "Home"))
}
