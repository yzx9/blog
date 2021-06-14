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
          primary: {
            50: "var(--color-primary-50)",
            100: "var(--color-primary-100)",
            200: "var(--color-primary-200)",
            300: "var(--color-primary-300)",
            400: "var(--color-primary-400)",
            500: "Var(--color-primary-500)",
            600: "var(--color-primary-600)",
            700: "var(--color-primary-700)",
            800: "var(--color-primary-800)",
            900: "var(--color-primary-900)",
          },
          secondary: {
            50: "var(--color-secondary-50)",
            100: "var(--color-secondary-100)",
            200: "var(--color-secondary-200)",
            300: "var(--color-secondary-300)",
            400: "var(--color-secondary-400)",
            500: "Var(--color-secondary-500)",
            600: "var(--color-secondary-600)",
            700: "var(--color-secondary-700)",
            800: "var(--color-secondary-800)",
            900: "var(--color-secondary-900)",
          },
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
