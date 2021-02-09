import { provide } from "vue"
import type { ClientAppSetup } from "@vuepress/client"
import {
  resolveMapFromTagToPosts,
  mapFromTagToPostsSymbol,
  resolveMapFromCategoryToPosts,
  mapFromCategoryToPostsSymbol,
  resolvePosts,
  postsSymbol,
} from "./composables"

const clientAppSetup: ClientAppSetup = () => {
  const mapFromTagToPage = resolveMapFromTagToPosts()
  provide(mapFromTagToPostsSymbol, mapFromTagToPage)

  const mapFromCategoryToPage = resolveMapFromCategoryToPosts()
  provide(mapFromCategoryToPostsSymbol, mapFromCategoryToPage)

  const posts = resolvePosts()
  provide(postsSymbol, posts)
}

export default clientAppSetup
