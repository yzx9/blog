import type { App } from "@vuepress/core"

export const resolvePageRoutes = (app: App) => {
  app.pages
    .filter((a) => !a.frontmatter.home)
    .filter((a) => !a.frontmatter.shadowPage)
    .filter((a) => a.path !== "/404.html")
    .forEach((a) => (a.path = `/posts/${a.slug}.html`))
}
