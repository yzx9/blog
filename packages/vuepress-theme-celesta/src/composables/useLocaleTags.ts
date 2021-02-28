import { computed } from "vue"
import { usePageData, useThemeLocaleData } from "../composables"

export const useLocaleTags = () => {
  const pageData = usePageData()
  const localeData = useThemeLocaleData()

  const tags = computed(() =>
    pageData.value.tags.map((a) => ({
      ...a,
      name: localeData.value.translations?.[a.slug] ?? a.slug,
    }))
  )

  return tags
}
