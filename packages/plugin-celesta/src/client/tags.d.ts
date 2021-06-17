import type { PageToRawTagNameMap, PageToTagsMap, StorageTags } from "../types"

declare module "@temp/celesta/tags" {
  export const tags: StorageTags
  export const pageToTagsMap: PageToTagsMap
  export const pageToRawTagNameMap: PageToRawTagNameMap
}
