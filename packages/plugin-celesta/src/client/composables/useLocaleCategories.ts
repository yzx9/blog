import { computed } from "vue"
import { usePageLang } from "@vuepress/client"
import { useRoute } from "vue-router"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import { pageToCategoriesMap } from "@temp/celesta/categories"
import type { ComputedRef } from "vue"
import type { Category } from "../../types"

export const useLocaleCategories = () => {
  const lang = usePageLang()
  const route = useRoute()

  const resolveName = (a: Category | null): Category | null => {
    return a
      ? {
          ...a,
          parent: resolveName(a.parent),
          name:
            localeTranslations?.[lang.value]?.[a.slug] ??
            defaultTranslations?.[a.slug] ??
            a.name,
        }
      : null
  }

  const categories = computed(
    () => pageToCategoriesMap[route.path]?.map(resolveName) || []
  ) as ComputedRef<Category[]>

  return categories
}
