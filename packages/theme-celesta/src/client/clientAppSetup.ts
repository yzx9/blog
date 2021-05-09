import { provide } from "vue"
import { defineClientAppSetup } from "@vuepress/client"
import {
  resolveMapFromTagToPosts,
  mapFromTagToPostsSymbol,
  resolveMapFromCategoryToPosts,
  mapFromCategoryToPostsSymbol,
  resolvePosts,
  postsSymbol,
} from "vuepress-plugin-celesta/lib/client"

export default defineClientAppSetup(() => {
  const mapFromTagToPage = resolveMapFromTagToPosts()
  provide(mapFromTagToPostsSymbol, mapFromTagToPage)

  const mapFromCategoryToPage = resolveMapFromCategoryToPosts()
  provide(mapFromCategoryToPostsSymbol, mapFromCategoryToPage)

  const posts = resolvePosts()
  provide(postsSymbol, posts)
})
