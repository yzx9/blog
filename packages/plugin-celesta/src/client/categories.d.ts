import type {
  Categories,
  PageToRawCategoryNameMap,
  PageToCategoriesMap,
} from "src/types"

declare module "@temp/celesta/categories" {
  export const rootCategories: Categories
  export const pageToCategoriesMap: PageToCategoriesMap
  export const pageToRawCategoryNameMap: PageToRawCategoryNameMap
}
