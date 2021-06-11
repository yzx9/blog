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
import type { Tags } from "../../types"
import type { DeepReadonly, Ref } from "vue"

type TagsMutableRef = Ref<Tags>
type TagsRef = DeepReadonly<Ref<Tags>>

const tags = ref(_tags)

export function useTags(): {
  currentTags: TagsRef
  allTags: TagsRef
} {
  const allTags = useAllTags()
  const currentTags = useCurrentTags(allTags)
  return {
    currentTags: readonly(currentTags),
    allTags: readonly(allTags),
  }
}

function useAllTags(): TagsMutableRef {
  const lang = usePageLang()
  const localeTags = computed(() =>
    tags.value.map((tag) => ({
      ...tag,
      name:
        localeTranslations?.[lang.value]?.[tag.slug] ||
        defaultTranslations?.[tag.slug] ||
        tag.slug,
    }))
  )

  return localeTags
}

function useCurrentTags(allTags: TagsMutableRef): TagsMutableRef {
  const route = useRoute()
  const currentTags = computed(() =>
    allTags.value
      .filter((b) => pageToTagsMap[route.path].includes(b.slug))
      .map((tag) => ({
        ...tag,
        name:
          tag.name === tag.slug
            ? pageToRawTagNameMap[route.path]?.[tag.slug] ?? tag.slug
            : tag.name,
      }))
  )

  return currentTags
}
