import { computed } from "vue"
import { usePageData } from "@vuepress/client"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import type { ThemePageData } from "../../types"

export const useLocaleTags = () => {
  const pageData = usePageData<ThemePageData>()

  const tags = computed(() =>
    pageData.value.tags.map((a) => ({
      ...a,
      name:
        localeTranslations?.[pageData.value.lang]?.[a.slug] ??
        defaultTranslations?.[a.slug] ??
        a.slug,
    }))
  )

  return tags
}
