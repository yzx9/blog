import type { App } from "@vuepress/core"
import { createPage } from "@vuepress/core"

export const createTagsPage = async (app: App) => {
  // TODO tags page
  app.pages.push(
    await createPage(app, {
      path: "/tags.html",
      frontmatter: {
        layout: "Home",
      },
    })
  )
}
