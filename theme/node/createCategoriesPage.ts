import type { App } from "@vuepress/core"
import { createPage } from "@vuepress/core"

export const createCategoriesPages = async (app: App) => {
  // TODO categories page
  app.pages.push(
    await createPage(app, {
      path: "/categories.html",
      frontmatter: {
        layout: "Home",
      },
    })
  )
}
