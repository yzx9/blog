import type { PageToTagsMap, TagToPagesMap } from "src/types"

declare module "@temp/celesta/tags" {
  export const tagToPagesMap: TagToPagesMap
  export const pageToTagsMap: PageToTagsMap
}
