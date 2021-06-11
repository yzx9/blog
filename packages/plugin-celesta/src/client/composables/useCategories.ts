import { computed, readonly, ref } from "vue"
import { usePageLang } from "@vuepress/client"
import { useRoute } from "vue-router"
import {
  defaultTranslations,
  localeTranslations,
} from "@temp/celesta/translations"
import {
  rootCategories as _rootCategories,
  pageToRawCategoryNameMap,
  pageToCategoriesMap,
} from "@temp/celesta/categories"
import type { DeepReadonly, Ref } from "vue"
import type { Categories, Category, PageToCategoriesMap } from "../../types"

type CategoriesMutableRef = Ref<Categories>
type CategoriesRef = DeepReadonly<CategoriesMutableRef>

const rootCategories = ref(_rootCategories)

export function useCategories(): {
  currentCategories: CategoriesRef
  rootCategories: CategoriesRef
  allCategories: CategoriesRef
} {
  const rootCategories = useRootCategories()
  const allCategories = useAllCategories(rootCategories)
  const currentCategories = useCurrentCategories(allCategories)

  return {
    rootCategories: readonly(rootCategories),
    allCategories: readonly(allCategories),
    currentCategories: readonly(currentCategories),
  }
}

function useRootCategories(): CategoriesMutableRef {
  const lang = usePageLang()
  const createWalker = (parent: Category) => (child: Category) => {
    child.parent = parent
    child.ancestors = parent.ancestors.concat(child)

    const lastSlug = child?.slug.split("/").pop()!
    child.name =
      localeTranslations?.[lang.value]?.[lastSlug] ??
      defaultTranslations?.[lastSlug] ??
      lastSlug

    const walk = createWalker(child)
    child.children.forEach(walk)
  }

  const localeRootCategories = computed(() =>
    rootCategories.value
      .filter((a) => !a.parent)
      .map((a) => {
        const walk = createWalker(a)
        a.children.map(walk)
        return a
      })
  )

  return localeRootCategories
}

function useAllCategories(
  rootCategories: CategoriesMutableRef
): CategoriesMutableRef {
  return computed(() => {
    const allCategories: Categories = []
    const flat = (root: Category) => {
      allCategories.push(root)
      root.children.map(flat)
    }
    rootCategories.value.forEach(flat)
    return allCategories
  })
}

function useCurrentCategories(
  allCategories: CategoriesMutableRef
): CategoriesMutableRef {
  const route = useRoute()

  const currentRawCategoriesRef = computed(
    () =>
      pageToCategoriesMap?.[route.path]?.map(
        (slug) => allCategories.value.find((a) => a.slug === slug)!
      ) ?? []
  )

  const currentCategoriesRef = computed(() =>
    currentRawCategoriesRef.value.map(createResolveLocaleCategory(route.path))
  )

  return currentCategoriesRef as CategoriesMutableRef
}

function createResolveLocaleCategory(path: string) {
  const resolveLocaleCategory = (
    category: Category | null
  ): Category | null => {
    if (!category) return null

    const parent = resolveLocaleCategory(category.parent)
    const lastSlug = category?.slug.split("/").pop()!
    const name =
      category.name === lastSlug
        ? pageToRawCategoryNameMap[path]?.[lastSlug] || lastSlug
        : category.name

    const localeCategory = { ...category, name, parent }
    localeCategory.ancestors = [...(parent?.ancestors ?? []), localeCategory]
    return localeCategory
  }

  return resolveLocaleCategory
}
