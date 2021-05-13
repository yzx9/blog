import { readonly, computed, reactive, toRefs } from "vue"
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
import type { Categories, Category } from "../../types"

type CategoriesMutableRef = Ref<Categories>
type CategoriesRef = DeepReadonly<CategoriesMutableRef>

const { allCategories, rootCategories } = toRefs(
  reactive(resolveCategories(_rootCategories))
)

export function useCategories(): {
  currentCategories: CategoriesRef
  rootCategories: CategoriesRef
  allCategories: CategoriesRef
} {
  return {
    currentCategories: readonly(useCurrentCategories()),
    rootCategories: readonly(rootCategories),
    allCategories: readonly(allCategories),
  }
}

function resolveCategories(categories: Categories) {
  const rootCategories = categories
    .filter((a) => !a.parent)
    .map((a) => {
      a.children.map(treeWalker(a))
      return a
    })

  const allCategories: Categories = []
  const flat = (root: Category) => {
    allCategories.push(root)
    root.children.map(flat)
  }
  rootCategories.forEach(flat)
  return { allCategories, rootCategories }
}

function treeWalker(parent: Category) {
  return (child: Category) => {
    child.parent = parent
    child.ancestors = parent.ancestors.concat(child)
    child.children.map((a) => treeWalker(a))
  }
}

function useCurrentCategories(): CategoriesRef {
  const route = useRoute()
  const lang = usePageLang()
  const currentRawCategoriesRef = computed(
    () =>
      pageToCategoriesMap[route.path].map((slug) =>
        allCategories.value.find((a) => a.slug === slug)
      ) as Categories
  )

  const currentCategoriesRef = computed(() => {
    const resolveLocaleCategory = createResolveLocaleCategory(
      lang.value,
      route.path
    )

    return currentRawCategoriesRef.value.map(
      (a) => resolveLocaleCategory(a) as Category
    )
  })

  return currentCategoriesRef
}

function createResolveLocaleCategory(lang: string, path: string) {
  const resolveLocaleCategory = (
    category: Category | null
  ): Category | null => {
    if (!category) return null

    const parent = resolveLocaleCategory(category.parent)
    const lastSlug = category?.slug.split("/").pop() as string
    const name =
      localeTranslations?.[lang]?.[lastSlug] ||
      defaultTranslations?.[lastSlug] ||
      pageToRawCategoryNameMap[path]?.[category.slug] ||
      category.slug

    const localeCategory: Category = { ...category, name, parent }
    localeCategory.ancestors = [...(parent?.ancestors ?? []), localeCategory]
    return localeCategory
  }

  return resolveLocaleCategory
}
