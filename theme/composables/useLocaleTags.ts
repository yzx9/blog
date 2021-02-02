import { ref } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "@vuepress/client"
import { normalizeCategoryOrTag } from "../utils"
import type { ThemeOptions, ThemeLocaleOptions, ThemePageData } from "../types"

export const useLocaleTags = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()

  let prefix = "/tags"
  const useLocaleTag = (raw: string) => {
    const tag = normalizeCategoryOrTag(raw)
    const name = localeData.value.tags?.[tag] ?? data.value.tags?.[tag] ?? raw
    const url = [prefix, tag].join("/")
    prefix = url

    return { raw, name, url }
  }

  const tags = pageData.value.tags.map(useLocaleTag)
  return ref(tags)
}
