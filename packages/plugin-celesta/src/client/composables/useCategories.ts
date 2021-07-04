import { computed, inject, readonly, ref } from "vue"
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
import type { DeepReadonly, Ref, InjectionKey } from "vue"
import type { Categories, Category, StorageCategory } from "../../types"

type CategoriesMutableRef = Ref<Categories>
type CategoriesRef = DeepReadonly<CategoriesMutableRef>
type CategoriesResult = {
  currentCategories: CategoriesRef
  rootCategories: CategoriesRef
  allCategories: CategoriesRef
}

const rootCategories = ref(_rootCategories)

export const categoriesSymbol: InjectionKey<CategoriesResult> = Symbol(
  "@celesta/categories"
)

export function resolveCategories(): CategoriesResult {
  const rootCategories = useRootCategories()
  const allCategories = useAllCategories(rootCategories)
  const currentCategories = useCurrentCategories(allCategories)

  return {
    rootCategories: readonly(rootCategories),
    allCategories: readonly(allCategories),
    currentCategories: readonly(currentCategories),
  }
}

export function useCategories(): CategoriesResult {
  const categories = inject(categoriesSymbol)
  if (!categories) {
    throw new Error("useCategories() is called without provider.")
  }
  return categories
}

function useRootCategories(): CategoriesMutableRef {
  const lang = usePageLang()
  const createWalker =
    (parent: Category | null) =>
    (child: StorageCategory): Category => {
      const lastSlug = child?.slug.split("/").pop()!
      const name =
        localeTranslations[lang.value]?.[lastSlug] ??
        defaultTranslations[lastSlug] ??
        lastSlug

      const newChild: Category = {
        ...child,
        name,
        parent,
        ancestors: [],
      }
      newChild.ancestors = parent
        ? parent.ancestors.concat(newChild)
        : [newChild]

      const walk = createWalker(newChild)
      newChild.children = newChild.children.map(walk)

      return newChild
    }

  const localeRootCategories = computed<Categories>(() => {
    const walk = createWalker(null)
    return rootCategories.value.map(walk)
  })

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
      pageToCategoriesMap[route.path]?.map(
        (slug) => allCategories.value.find((a) => a.slug === slug)!
      ) ?? []
  )

  return computed(() =>
    currentRawCategoriesRef.value.map(createResolveLocaleCategory(route.path))
  ) as CategoriesMutableRef
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
