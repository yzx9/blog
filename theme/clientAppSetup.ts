import { provide } from "vue"
import type { ClientAppSetup } from "@vuepress/client"
import {
  resolveMapFromTagToPage,
  mapFromTagToPageSymbol,
  resolveMapFromCategoryToPage,
  mapFromCategoryToPageSymbol,
} from "./composables"

const clientAppSetup: ClientAppSetup = () => {
  const mapFromTagToPage = resolveMapFromTagToPage()
  provide(mapFromTagToPageSymbol, mapFromTagToPage)

  const mapFromCategoryToPage = resolveMapFromCategoryToPage()
  provide(mapFromCategoryToPageSymbol, mapFromCategoryToPage)
}

export default clientAppSetup
