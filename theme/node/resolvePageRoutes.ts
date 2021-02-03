import type { App } from "@vuepress/core"

export const resolvePageRoutes = (app: App) => {
  app.pages
    .filter((a) => a.slug)
    .forEach((a) => (a.path = `/posts/${a.slug}.html`))
}
