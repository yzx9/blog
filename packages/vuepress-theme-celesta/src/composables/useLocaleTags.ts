import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import { useThemeData, useThemeLocaleData } from "../composables"
import type { ThemePageData } from "../types"

export const useLocaleTags = () => {
  const pageData = usePageData<ThemePageData>()
  const localeData = useThemeLocaleData()
  const data = useThemeData()

  const tags = computed(() =>
    pageData.value.tags.map((a) => ({
      ...a,
      name:
        localeData.value.translations?.[a.slug] ??
        data.value.translations?.[a.slug] ??
        a.slug,
    }))
  )

  return tags
}
