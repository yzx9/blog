import { inject } from "vue"
import { usePagesData } from "@vuepress/client"
import type { InjectionKey } from "vue"
import type { PageData } from "@vuepress/client"
import type { ThemePageData } from "../types"
import { isPost } from "../utils"

export type PostData = PageData<ThemePageData>

export const postsSymbol: InjectionKey<Promise<PostData[]>> = Symbol("posts")

/**
 * Inject posts global computed
 */
export const usePosts = async (): Promise<PostData[]> => {
  const posts = inject(postsSymbol)
  if (!posts) {
    throw new Error("usePosts() is called without provider.")
  }
  return posts
}

export const resolvePosts = async (): Promise<PostData[]> => {
  const pagesData = usePagesData()

  const pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )

  const posts = pages.filter(isPost)

  return posts as PostData[]
}
