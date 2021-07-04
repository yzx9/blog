import { computed, inject, InjectionKey, readonly, ref } from "vue"
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
type TagsResult = {
  currentTags: TagsRef
  allTags: TagsRef
}

const tags = ref(_tags)

export const tagsSymbol: InjectionKey<TagsResult> = Symbol("@celesta/tags")

export function resolveTags(): TagsResult {
  const allTags = useAllTags()
  const currentTags = useCurrentTags(allTags)

  return {
    currentTags: readonly(currentTags),
    allTags: readonly(allTags),
  }
}

export function useTags(): TagsResult {
  const tags = inject(tagsSymbol)
  if (!tags) {
    throw new Error("useTags() is called without provider.")
  }
  return tags
}

function useAllTags(): TagsMutableRef {
  const lang = usePageLang()
  return computed(() =>
    tags.value.map((tag) => ({
      ...tag,
      name:
        localeTranslations[lang.value]?.[tag.slug] ??
        defaultTranslations[tag.slug] ??
        tag.slug,
    }))
  )
}

function useCurrentTags(allTags: TagsMutableRef): TagsMutableRef {
  const route = useRoute()
  return computed(() =>
    allTags.value
      .filter((a) => pageToTagsMap[route.path]?.includes(a.slug))
      .map((tag) => ({
        ...tag,
        name:
          tag.name === tag.slug
            ? pageToRawTagNameMap[route.path]?.[tag.slug] ?? tag.slug
            : tag.name,
      }))
  )
}
