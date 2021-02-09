import { computed, ref } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "@vuepress/client"
import type { ThemeOptions, ThemeLocaleOptions, ThemePageData } from "../types"

export const useLocaleTags = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()

  const tags = computed(() =>
    pageData.value.tags.map((a) => ({
      ...a,
      name:
        localeData.value.tags?.[a.slug] ?? data.value.tags?.[a.slug] ?? a.slug,
    }))
  )

  return tags
}
