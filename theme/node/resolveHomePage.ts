import { App } from "@vuepress/core"

export const resolveHomePage = (app: App) => {
  app.pages
    .filter((a) => a.frontmatter.home)
    .forEach((a) => (a.frontmatter.layout = "Home"))
}
