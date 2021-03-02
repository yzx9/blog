import { computed } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "."
import type { ThemePageCategory } from "../types"

export const useLocaleCategories = () => {
  const pageData = usePageData()
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

  const categories = computed(
    () => pageData.value.categories.map(resolveName) as ThemePageCategory[]
  )

  return categories
}
