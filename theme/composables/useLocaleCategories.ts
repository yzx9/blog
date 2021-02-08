import { computed } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "@vuepress/client"
import type {
  ThemeOptions,
  ThemeLocaleOptions,
  ThemePageData,
  ThemePageCategory,
} from "../types"

export const useLocaleCategories = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()

  const resolveName = (
    a: ThemePageCategory | null
  ): ThemePageCategory | null => {
    return a
      ? {
          ...a,
          parent: resolveName(a.parent),
          name:
            localeData.value.categories?.[a.name] ??
            data.value.categories?.[a.name] ??
            a.raw,
        }
      : null
  }

  const categories = computed(() => pageData.value.categories.map(resolveName))

  return categories
}
