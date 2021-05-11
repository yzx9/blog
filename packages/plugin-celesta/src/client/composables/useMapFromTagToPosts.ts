import { tagToPagesMap } from "@temp/celesta/tags"
import type { TagToPagesMap } from "src/types"

export const useMapFromTagToPosts = (): TagToPagesMap => {
  return tagToPagesMap
}
