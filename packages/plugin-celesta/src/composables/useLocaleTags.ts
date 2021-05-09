import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client"
import type { ThemeData, ThemePageData } from "../types"

export const useLocaleTags = () => {
  const pageData = usePageData<ThemePageData>()
  const themeLocaleData = useThemeLocaleData<ThemeData>()

  const tags = computed(() =>
    pageData.value.tags.map((a) => ({
      ...a,
      name: themeLocaleData.value.translations?.[a.slug] ?? a.slug,
    }))
  )

  return tags
}
