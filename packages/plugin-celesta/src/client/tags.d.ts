import type { PageToRawTagNameMap, PageToTagsMap, Tags } from "src/types"

declare module "@temp/celesta/tags" {
  export const tags: Tags
  export const pageToTagsMap: PageToTagsMap
  export const pageToRawTagNameMap: PageToRawTagNameMap
}
