import type { App } from "@vuepress/core"
import { createPage } from "@vuepress/core"

export const createHomePage = async (app: App) => {
  app.pages.push(
    await createPage(app, {
      path: "/",
      frontmatter: {
        layout: "Home",
      },
    })
  )
}
