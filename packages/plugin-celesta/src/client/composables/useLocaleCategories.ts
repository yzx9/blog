import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import type { ThemePageData, ThemePageCategory } from "../../types"

export const useLocaleCategories = () => {
  const pageData = usePageData<ThemePageData>()

  const resolveName = (
    a: ThemePageCategory | null
  ): ThemePageCategory | null => {
    return a
      ? {
          ...a,
          parent: resolveName(a.parent),
          name:
            localeTranslations?.[pageData.value.lang]?.[a.slug] ??
            defaultTranslations?.[a.slug] ??
            a.name,
        }
      : null
  }

  const categories = computed(
    () => pageData.value.categories.map(resolveName) as ThemePageCategory[]
  )

  return categories
}
