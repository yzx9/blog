<template>
  <div class="header">
    <h1 class="header__title">{{ title }}</h1>
    <div class="header__meta">
      <div class="header__meta-item">发表于 {{ date }}</div>
      <div v-if="showUpdate" class="header__meta-item">
        更新于 {{ updated }}
      </div>
      <div class="header__meta-item">
        分类于
        <RouterLink
          v-for="{ name, path } in categories"
          :key="`v-header-${path}`"
          :to="path"
          class="header__category"
        >
          {{ name }}
        </RouterLink>
      </div>
    </div>

    <Particles class="header__background" preset="starry" />
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue"
import { usePageData } from "@vuepress/client"
import Particles from "./Particles.vue"
import type { ThemePageData } from "../types"
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

    return {
      title,
      date,
      updated,
      showUpdate,
      categories,
    }
  },
}
</script>
