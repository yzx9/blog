import { computed } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "@vuepress/client"
import type { ThemeOptions, ThemeLocaleOptions, ThemePageData } from "../types"

export const useLocaleCategories = () => {
  // TODO support multi categories
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()

  const categories = computed(() =>
    pageData.value.categories.map((a) => ({
      ...a,
      name:
        localeData.value.categories?.[a.name] ??
        data.value.categories?.[a.name] ??
        a.raw,
    }))
  )

  return categories
}
