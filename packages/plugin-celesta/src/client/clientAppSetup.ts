import { defineClientAppSetup } from "@vuepress/client"
import { provide } from "vue"
import {
  categoriesSymbol,
  resolveCategories,
  resolveTags,
  tagsSymbol,
} from "./composables"

export default defineClientAppSetup(() => {
  const categories = resolveCategories()
  provide(categoriesSymbol, categories)

  const tags = resolveTags()
  provide(tagsSymbol, tags)
})
