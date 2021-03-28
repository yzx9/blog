import type { App } from "@vuepress/core"

export const initialzeViteBundlerConfig = (app: App) => {
  if (app.options.bundler.endsWith("vite")) {
    app.options.bundlerConfig.viteOptions = require("vite").mergeConfig(app.options.bundlerConfig.viteOptions, {
      optimizeDeps: {
        exclude: ["@vuepress/shared"],
      },
    })
  }
}
