import { provide } from "vue"
import { defineClientAppSetup } from "@vuepress/client"
import {
  resolveMapFromCategoryToPosts,
  mapFromCategoryToPostsSymbol,
  resolvePosts,
  postsSymbol,
} from "./composables"

export default defineClientAppSetup(() => {
  const mapFromCategoryToPage = resolveMapFromCategoryToPosts()
  provide(mapFromCategoryToPostsSymbol, mapFromCategoryToPage)

  const posts = resolvePosts()
  provide(postsSymbol, posts)
})
