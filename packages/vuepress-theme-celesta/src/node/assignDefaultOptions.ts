import { ThemeLocaleOptions, ThemeOptions } from "../types"
import { assignOptionTranslations } from "./assignOptionTranslations"

const defaultLang = "en-US"

const defaultLocaleSet: Record<string, ThemeLocaleOptions> = {
  "en-US": {
    notFound: [
      "There's nothing here.",
      "How did we get here?",
      "That's a Four-Oh-Four.",
      "Looks like we've got some broken links.",
      "You are drunk.",
      "The page you're looking for doesn't exist. Ooops",
      "This is awkward",
      "Oooops",
    ],
    backToHome: ["Take me home.", "Go Home", "Homepage", "HEAD ON HOME"],
    translations: {},
  },
  "zh-CN": {
    notFound: [
      "你来到了世界尽头",
      "你来到了洪荒之地",
      "知识尚未触及",
      "令人尴尬，我们没找到这篇文章",
      "博主正在火速赶来",
      "这里什么都没有",
      "我们怎么到这来了？",
      "这是一个 404 页面",
      "看起来我们进入了错误的链接",
    ],
    backToHome: ["返回首页"],
    translations: {},
  },
}

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultOptions = (
  options: ThemeOptions,
  lang = defaultLang
) => {
  const defaultOptions = defaultLocaleSet[defaultLang]

  if (!options.locales) options.locales = {}
  if (!options.locales["/"]) options.locales["/"] = {}

  Object.assign(options, {
    ...defaultOptions,
    ...options,
  })

  Object.assign(options.locales["/"], {
    ...(defaultLocaleSet[lang] ?? defaultOptions),
    ...options.locales["/"],
  })

  assignOptionTranslations(options)
}
