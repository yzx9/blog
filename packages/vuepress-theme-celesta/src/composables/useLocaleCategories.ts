import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import { useThemeData, useThemeLocaleData } from "."
import type { ThemePageData, ThemePageCategory } from "../types"

export const useLocaleCategories = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData()
  const data = useThemeData()

  const resolveName = (
    a: ThemePageCategory | null
  ): ThemePageCategory | null => {
    return a
      ? {
          ...a,
          parent: resolveName(a.parent),
          name:
            localeData.value.translations?.[a.slug] ??
            data.value.translations?.[a.slug] ??
            a.name,
        }
      : null
  }

  const categories = computed(() => pageData.value.categories.map(resolveName))

  return categories
}
