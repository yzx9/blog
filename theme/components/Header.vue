<template>
  <div class="header">
    <slot>
      <div class="flex flex-col items-start">
        <div class="z-30 min-w-max">
          <RouterLink
            v-for="{ name, path } in tags"
            :key="`v-page-${path}`"
            :to="path"
            class="text-white border rounded-full px-3 py-1 transition-colors duration-300 hover:border-transparent hover:bg-primary-500 hover:bg-opacity-50"
          >
            {{ name }}
          </RouterLink>
        </div>
        <h1 class="header__title">{{ title }}</h1>
      </div>
      <div class="header__meta">
        <div class="header__meta-item">发表于 {{ date }}</div>
        <div v-if="showUpdate" class="header__meta-item">
          更新于 {{ updated }}
        </div>
      </div>
      <div class="header__meta">
        <div class="header__meta-item">
          分类于
          <span
            v-for="categories in categoriesArray"
            class="header__categories"
          >
            <RouterLink
              v-for="{ name, path } in categories"
              :key="`v-header-${path}`"
              :to="path"
              class="header__category"
            >
              {{ name }}
            </RouterLink>
          </span>
        </div>
      </div>
    </slot>

    <Particles class="header__background" preset="starry" />
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue"
import { usePageData } from "@vuepress/client"
import Particles from "./Particles.vue"
import { useLocaleCategories, useLocaleTags } from "../composables"
import type { ThemePageCategory, ThemePageData } from "../types"

export default {
  components: {
    Particles,
  },
  setup(props, ctx) {
    const pageData = usePageData<ThemePageData>()

    const { title, date, updated } = toRefs(pageData.value)
    const showUpdate = computed(() => date.value !== updated.value)

    const categories = useLocaleCategories()
    const categoriesArray = computed(() => {
      return categories.value.map((a) => {
        const arr: ThemePageCategory[] = []
        let p: ThemePageCategory | null = a
        while (p) {
          arr.unshift(p)
          p = p.parent
        }
        return arr
      })
    })

    const tags = useLocaleTags()

    return {
      title,
      date,
      updated,
      showUpdate,
      categoriesArray,
      tags,
    }
  },
}
</script>
