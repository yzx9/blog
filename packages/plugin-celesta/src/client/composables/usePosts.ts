import { inject } from "vue"
import { usePagesData } from "@vuepress/client"
import type { InjectionKey } from "vue"
import type { PageData } from "../../types"
import { isPost } from "../utils"

export const postsSymbol: InjectionKey<Promise<PageData[]>> = Symbol("posts")

/**
 * Inject posts global computed
 */
export const usePosts = async (): Promise<PageData[]> => {
  const posts = inject(postsSymbol)
  if (!posts) {
    throw new Error("usePosts() is called without provider.")
  }
  return posts
}

export const resolvePosts = async (): Promise<PageData[]> => {
  const pagesData = usePagesData()

  const pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )

  const posts = pages.filter(isPost)

  return posts as PageData[]
}
