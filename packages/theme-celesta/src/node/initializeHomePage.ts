import { createPage } from "@vuepress/core"
import type { App } from "@vuepress/core"

export const initializeHomePage = async (app: App) => {
  if (app.pages.every((page) => page.path !== "/")) {
    const homepage = await createPage(app, {
      path: "/",
      content: "",
      frontmatter: {
        layout: "Homepage",
        shadowPage: true,
      },
    })
    app.pages.push(homepage)
  }
}
