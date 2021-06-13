import { cyan, pink } from "tailwindcss/colors"
import type { App } from "@vuepress/core"
import type { ProcessOptions, Plugin } from "postcss"
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack"
import type { ViteBundlerOptions } from "@vuepress/bundler-vite"

type PostcssConfig = ProcessOptions & { plugins: Plugin[] }

export function assignPostcssConfig(app: App) {
  const tailwindConfig = {
    purge: [
      "posts/**/*.md",
      "node_modules/@celesta/vuepress-theme-celesta/lib/**/*.css",
      "node_modules/@celesta/vuepress-theme-celesta/lib/**/*.vue",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primary: cyan,
          secondary: pink,
        },
      },
    },
    variants: { extend: {} },
    plugins: [require("@tailwindcss/typography")],
  }

  const postcssConfig: PostcssConfig = {
    plugins: [
      require(require.resolve("postcss-import")),
      require(require.resolve("tailwindcss"))(tailwindConfig),
      require(require.resolve("postcss-nesting")),
      ...(process.env.NODE_ENV === "production"
        ? [
            require(require.resolve("autoprefixer")),
            require(require.resolve("postcss-csso")),
          ]
        : []),
    ],
  }
  const webpackBundlerOptions: WebpackBundlerOptions = {
    postcss: {
      postcssOptions: postcssConfig,
    },
  }

  const viteBundlerOptions: ViteBundlerOptions = {
    viteOptions: {
      css: {
        postcss: postcssConfig,
      },
    },
  }

  // TODO: handle user config
  switch (app.options.bundler) {
    case "@vuepress/bundler-webpack":
    case "@vuepress/webpack":
      app.options.bundlerConfig = webpackBundlerOptions
      break
    case "@vuepress/bundler-vite":
    case "@vuepress/vite":
      app.options.bundlerConfig = viteBundlerOptions
      break
  }
}
