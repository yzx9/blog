import { computed } from "vue"
import { usePageData, useThemeData, useThemeLocaleData } from "."

export const useLocaleTags = () => {
  const pageData = usePageData()
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
