import { PageData, usePagesData } from "@vuepress/client"
import { inject, InjectionKey } from "vue"
import type { ThemePageData } from "../types"

/**
 * Category path to page data
 */
type MapFromTagToPage = Map<string, Set<PageData<ThemePageData>>>

export const mapFromTagToPageSymbol: InjectionKey<
  Promise<MapFromTagToPage>
> = Symbol("mapFromTagToPage")

/**
 * Inject tags global computed
 */
export const useMapFromTagToPage = async (): Promise<MapFromTagToPage> => {
  const map = inject(mapFromTagToPageSymbol)
  if (!map) {
    throw new Error("useMapFromTagToPage() is called without provider.")
  }
  return map
}

export const resolveMapFromTagToPage = async (): Promise<MapFromTagToPage> => {
  const pagesData = usePagesData()

  const pages = (await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )) as PageData<ThemePageData>[]

  const map: MapFromTagToPage = new Map()
  pages.map((page) => {
    const { tags } = page
    tags.map((a) => {
      const set = map.get(a.path) || new Set<PageData<ThemePageData>>()
      set.add(page)
      map.set(a.path, set)
    })
  })

  return map
}
