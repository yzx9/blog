<template>
  <article class="page">
    <header class="page__header page-header">
      <h1 class="page-header__title">{{ title }}</h1>
      <div class="page-header__meta">
        <div class="page-header__meta-item">发表于 {{ created }}</div>
        <div v-if="showUpdate" class="page-header__meta-item">
          更新于 {{ updated }}
        </div>
        <div class="page-header__meta-item">
          分类于
          <RouterLink
            v-for="{ raw, name, url } in categories"
            :key="`v-page-category-${raw}`"
            :to="url"
            class="page-header__category"
          >
            {{ name }}
          </RouterLink>
        </div>
      </div>
    </header>
    <div class="page__content">
      <Content />
    </div>
    <div class="page__footer page-footer">
      <RouterLink
        v-for="{ raw, name, url } in tags"
        :key="`v-page-tag-${raw}`"
        :to="url"
        class="page-header__tag"
      >
        {{ name }}
      </RouterLink>
    </div>
  </article>
</template>

<script lang="ts">
import { usePageFrontmatter, usePageData } from "@vuepress/client"
import type { ThemeFrontmatter, ThemePageData } from "../types"
import { useLocaleCategories, useLocaleTags } from "../composables"

export default {
  setup(props, ctx) {
    const frontmatter = usePageFrontmatter<ThemeFrontmatter>()
    const pageData = usePageData<ThemePageData>()

    const title = frontmatter.value.title || pageData.value.title
    const created = pageData.value.date
    const updated = pageData.value.updated
    const showUpdate = created !== updated
    const categories = useLocaleCategories()
    const tags = useLocaleTags()

    return {
      title,
      created,
      updated,
      showUpdate,
      categories,
      tags,
    }
  },
}
</script>
