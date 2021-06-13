import type {
  PageToRawTagNameMap,
  PageToTagsMap,
  PaginationStorageDataSet,
  Tags,
} from "src/types"

declare module "@temp/celesta/pagination" {
  export const paginationDataSet: PaginationStorageDataSet
}
