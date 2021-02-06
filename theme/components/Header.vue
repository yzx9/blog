<template>
  <div class="header">
    <h1 class="header__title">{{ title }}</h1>
    <div class="header__meta">
      <div class="header__meta-item">发表于 {{ created }}</div>
      <div v-if="showUpdate" class="header__meta-item">
        更新于 {{ updated }}
      </div>
      <div class="header__meta-item">
        分类于
        <RouterLink
          v-for="{ raw, name, url } in categories"
          :key="`v-page-category-${raw}`"
          :to="url"
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
import { usePageFrontmatter, usePageData } from "@vuepress/client"
import type { ThemeFrontmatter, ThemePageData } from "../types"
import Particles from "./Particles.vue"
import { useLocaleCategories } from "../composables"

export default {
  components: {
    Particles,
  },
  setup(props, ctx) {
    const frontmatter = usePageFrontmatter<ThemeFrontmatter>()
    const pageData = usePageData<ThemePageData>()

    const title = frontmatter.value.title || pageData.value.title
    const created = pageData.value.date
    const updated = pageData.value.updated
    const showUpdate = created !== updated
    const categories = useLocaleCategories()

    return {
      title,
      created,
      updated,
      showUpdate,
      categories,
    }
  },
}
</script>
