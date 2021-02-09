import { PageData, usePagesData } from "@vuepress/client"
import { inject, InjectionKey } from "vue"
import type { ThemePageCategory, ThemePageData } from "../types"

type CategoryTree = {
  data: ThemePageCategory
  pages: Set<PageData<ThemePageData>>
  children: Set<CategoryTree>
}

/**
 * Category path to page data
 */
type CategoryPagesMap = Map<string, CategoryTree>

export const mapFromCategoryToPageSymbol: InjectionKey<
  Promise<CategoryPagesMap>
> = Symbol("categoryPageMap")

/**
 * Inject tags global computed
 */
export const useMapFromCategoryToPage = async (): Promise<CategoryPagesMap> => {
  const map = inject(mapFromCategoryToPageSymbol)
  if (!map) {
    throw new Error("useMapFromCategoryToPage() is called without provider.")
  }
  return map
}

export const resolveMapFromCategoryToPage = async (): Promise<CategoryPagesMap> => {
  const pagesData = usePagesData()

  const pages = (await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )) as PageData<ThemePageData>[]

  const map: CategoryPagesMap = new Map()

  const resolveCategoryTree = (a: ThemePageCategory) => {
    if (map.has(a.path)) {
      // case 1: There is map of the current node
      return
    } else if (a.parent) {
      // case 2: There is the parent node of the current node
      resolveCategoryTree(a.parent)
      const tree: CategoryTree = {
        data: a,
        pages: new Set(),
        children: new Set(),
      }
      map.get(a.parent.path)?.children.add(tree)
      map.set(a.path, tree)
    } else {
      // case 3: The current node is the root node
      const tree: CategoryTree = {
        data: a,
        pages: new Set(),
        children: new Set(),
      }
      map.set(a.path, tree)
    }
  }

  pages.map((page) => {
    const { categories } = page
    categories.forEach(resolveCategoryTree)
    categories.forEach((a) => map.get(a.path)?.pages.add(page))
  })

  return map
}
