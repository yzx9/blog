import { computed, readonly, ref } from "vue"
import { useRoute } from "vue-router"
import { usePageLang } from "@vuepress/client"
import {
  tags as _tags,
  pageToTagsMap,
  pageToRawTagNameMap,
} from "@temp/celesta/tags"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import type { Tags, Tag } from "../../types"
import type { DeepReadonly, Ref } from "vue"

type TagsMutableRef = Ref<Tags>
type TagsRef = DeepReadonly<Ref<Tags>>

const tags = ref(_tags)

const useCurrentTags = (): TagsMutableRef => {
  const lang = usePageLang()
  const route = useRoute()
  const currentTags = pageToTagsMap[route.path] || []
  const localeTags = computed(() =>
    currentTags
      .map((a) => tags.value.find((b) => b.slug === a) as Tag)
      .map((tag) => ({
        ...tag,
        name:
          localeTranslations?.[lang.value]?.[tag.slug] ||
          defaultTranslations?.[tag.slug] ||
          pageToRawTagNameMap[route.path]?.[tag.slug] ||
          tag.slug,
      }))
  )

  return localeTags
}

export const useTags = (): {
  currentTags: TagsRef
  allTags: TagsRef
} => {
  return {
    currentTags: readonly(useCurrentTags()),
    allTags: readonly(tags),
  }
}
