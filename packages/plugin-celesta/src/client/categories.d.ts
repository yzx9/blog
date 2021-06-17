import type {
  PageToRawCategoryNameMap,
  PageToCategoriesMap,
  StorageCategories,
} from "../types"

declare module "@temp/celesta/categories" {
  export const rootCategories: StorageCategories
  export const pageToCategoriesMap: PageToCategoriesMap
  export const pageToRawCategoryNameMap: PageToRawCategoryNameMap
}
