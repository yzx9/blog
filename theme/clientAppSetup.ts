import { provide } from "vue"
import { ClientAppSetup } from "@vuepress/client"
import {
  resolveMapFromTagToPage,
  mapFromTagToPageSymbol,
  resolveMapFromCategoryToPage,
  mapFromCategoryToPageSymbol,
} from "./composables"

export const clientAppSetup: ClientAppSetup = async () => {
  const mapFromTagToPage = await resolveMapFromTagToPage()
  provide(mapFromTagToPageSymbol, mapFromTagToPage)

  const mapFromCategoryToPage = await resolveMapFromCategoryToPage()
  provide(mapFromCategoryToPageSymbol, mapFromCategoryToPage)
}

export default clientAppSetup
