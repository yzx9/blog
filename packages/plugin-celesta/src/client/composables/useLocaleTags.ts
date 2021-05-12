import { useRoute } from "vue-router"
import { usePageData } from "@vuepress/client"
import { pageToTagsMap } from "@temp/celesta/tags"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import type { ThemePageData, ThemePageTags } from "../../types"

export const useLocaleTags = (): ThemePageTags => {
  const pageData = usePageData<ThemePageData>()
  const lang = pageData.value.lang
  const route = useRoute()
  const tags = pageToTagsMap[route.path] || []
  const localeTags = tags.map((tag) => ({
    ...tag,
    name:
      localeTranslations?.[lang]?.[tag.slug] ??
      defaultTranslations?.[tag.slug] ??
      tag.slug,
  }))

  return localeTags
}
