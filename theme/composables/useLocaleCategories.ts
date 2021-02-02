import { ref } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "@vuepress/client"
import { normalizeCategoryOrTag } from "../utils"
import type { ThemeOptions, ThemeLocaleOptions, ThemePageData } from "../types"

export const useLocaleCategories = () => {
  // TODO support multi categories
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()

  let prefix = "/categories"
  const useLocaleCategory = (raw: string) => {
    const category = normalizeCategoryOrTag(raw)
    const name =
      localeData.value.categories?.[category] ??
      data.value.categories?.[category] ??
      raw
    const url = [prefix, category].join("/")
    prefix = url

    return { raw, name, url }
  }

  const categories = pageData.value.categories.map(useLocaleCategory)
  return ref(categories)
}
