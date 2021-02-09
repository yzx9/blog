import { PageData, usePagesData } from "@vuepress/client"
import { inject, InjectionKey } from "vue"
import type { ThemePageData } from "../types"
import { isPost } from "../utils"

/**
 * Category path to page data
 */
type MapFromTagToPosts = Map<string, Set<PageData<ThemePageData>>>

export const mapFromTagToPostsSymbol: InjectionKey<
  Promise<MapFromTagToPosts>
> = Symbol("mapFromTagToPosts")

/**
 * Inject tags global computed
 */
export const useMapFromTagToPosts = async (): Promise<MapFromTagToPosts> => {
  const map = inject(mapFromTagToPostsSymbol)
  if (!map) {
    throw new Error("useMapFromTagToPosts() is called without provider.")
  }
  return map
}

export const resolveMapFromTagToPosts = async (): Promise<MapFromTagToPosts> => {
  const pagesData = usePagesData()

  const pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )

  const posts = pages.filter(isPost) as PageData<ThemePageData>[]

  const map: MapFromTagToPosts = new Map()
  posts.map((post) => {
    const { tags } = post
    tags.map((a) => {
      const set = map.get(a.path) || new Set<PageData<ThemePageData>>()
      set.add(post)
      map.set(a.path, set)
    })
  })

  return map
}
