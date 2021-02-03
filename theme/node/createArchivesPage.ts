import type { App } from "@vuepress/core"
import { createPage } from "@vuepress/core"

export const createArchivesPage = async (app: App) => {
  // TODO archives page
  app.pages.push(
    await createPage(app, {
      path: "/archives.html",
      frontmatter: {
        layout: "Home",
      },
    })
  )
}
