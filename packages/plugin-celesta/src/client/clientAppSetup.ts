import { provide } from "vue"
import { defineClientAppSetup } from "@vuepress/client"
import { resolvePosts, postsSymbol } from "./composables"

export default defineClientAppSetup(() => {
  const posts = resolvePosts()
  provide(postsSymbol, posts)
})
