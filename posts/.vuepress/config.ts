import { defineUserConfig } from "@vuepress/cli"
import { translations } from "./translations"
import type { ThemeOptions } from "@celesta/vuepress-theme-celesta"

export default defineUserConfig<ThemeOptions>({
  title: "Celeste's blog",
  description: "Technique && Life",

  lang: "zh-CN",
  base: process.env.BASE_PATH || "/",
  head: [["link", { rel: "icon", href: `/logo.png` }]],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  bundler:
    process.env.NODE_ENV === "production"
      ? "@vuepress/webpack"
      : "@vuepress/vite",

  plugins: [],

  theme: "@celesta/vuepress-theme-celesta",
  themeConfig: {
    repo: "nsznsznjsz/blog",
    translations,
  },
})
