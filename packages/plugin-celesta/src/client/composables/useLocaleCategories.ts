import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client"
import type { ThemeData, ThemePageData, ThemePageCategory } from "../../types"

export const useLocaleCategories = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeData>()

  const resolveName = (
    a: ThemePageCategory | null
  ): ThemePageCategory | null => {
    return a
      ? {
          ...a,
          parent: resolveName(a.parent),
          name: localeData.value.translations?.[a.slug] ?? a.name,
        }
      : null
  }

  const categories = computed(
    () => pageData.value.categories.map(resolveName) as ThemePageCategory[]
  )

  return categories
}
