import { pageToCategoriesMap } from "@temp/celesta/categories"
import type { PageToCategoriesMap } from "src/types/categories"

export const useMapFromCategoryToPosts = (): PageToCategoriesMap => {
  return pageToCategoriesMap
}
