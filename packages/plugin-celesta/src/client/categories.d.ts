import type {
  Categories,
  PageToRawNameMap,
  PageToCategoriesMap,
} from "src/types"

declare module "@temp/celesta/categories" {
  export const rootCategories: Categories
  export const pageToRawNameMap: PageToRawNameMap
  export const pageToCategoriesMap: PageToCategoriesMap
}
