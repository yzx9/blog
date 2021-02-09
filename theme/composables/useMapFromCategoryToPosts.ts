import { PageData, usePagesData } from "@vuepress/client"
import { inject, InjectionKey } from "vue"
import type { ThemePageCategory, ThemePageData } from "../types"
import { isPost } from "../utils"

type CategoryTree = {
  data: ThemePageCategory
  posts: Set<PageData<ThemePageData>>
  children: Set<CategoryTree>
}

/**
 * Category path to page data
 */
type CategoryTreeMap = Map<string, CategoryTree>

export const mapFromCategoryToPostsSymbol: InjectionKey<
  Promise<CategoryTreeMap>
> = Symbol("mapFromCategoryToPosts")

/**
 * Inject tags global computed
 */
export const useMapFromCategoryToPosts = async (): Promise<CategoryTreeMap> => {
  const map = inject(mapFromCategoryToPostsSymbol)
  if (!map) {
    throw new Error("useMapFromCategoryToPosts() is called without provider.")
  }
  return map
}

export const resolveMapFromCategoryToPosts = async (): Promise<CategoryTreeMap> => {
  const pagesData = usePagesData()

  const pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )

  const posts = pages.filter(isPost) as PageData<ThemePageData>[]

  const map: CategoryTreeMap = new Map()

  const resolveCategoryTree = (a: ThemePageCategory) => {
    if (map.has(a.path)) {
      // case 1: There is map of the current node
      return
    } else if (a.parent) {
      // case 2: There is the parent node of the current node
      resolveCategoryTree(a.parent)
      const tree: CategoryTree = {
        data: a,
        posts: new Set(),
        children: new Set(),
      }
      map.get(a.parent.path)?.children.add(tree)
      map.set(a.path, tree)
    } else {
      // case 3: The current node is the root node
      const tree: CategoryTree = {
        data: a,
        posts: new Set(),
        children: new Set(),
      }
      map.set(a.path, tree)
    }
  }

  posts.map((page) => {
    const { categories } = page
    categories.forEach(resolveCategoryTree)
    categories.forEach((a) => map.get(a.path)?.posts.add(page))
  })

  return map
}
