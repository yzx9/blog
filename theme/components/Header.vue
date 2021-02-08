<template>
  <div class="header">
    <h1 class="header__title">{{ title }}</h1>
    <div class="header__meta">
      <div class="header__meta-item">发表于 {{ date }}</div>
      <div v-if="showUpdate" class="header__meta-item">
        更新于 {{ updated }}
      </div>
    </div>
    <div class="header__meta">
      <div class="header__meta-item">
        分类于
        <span v-for="categories in categoriesArray" class="header__categories">
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

    <Particles class="header__background" preset="starry" />
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue"
import { usePageData } from "@vuepress/client"
import Particles from "./Particles.vue"
import type { ThemePageCategory, ThemePageData } from "../types"
import { useLocaleCategories } from "../composables"

export default {
  components: {
    Particles,
  },
  setup(props, ctx) {
    const pageData = usePageData<ThemePageData>()

    const { title, date, updated } = toRefs(pageData.value)
    const showUpdate = computed(() => date !== updated)
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

    return {
      title,
      date,
      updated,
      showUpdate,
      categoriesArray,
    }
  },
}
</script>
