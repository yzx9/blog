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
          <a
            v-for="category in categories"
            :key="`v-page-category-${category}`"
            class="page-header__category"
            :href="$withBase(`/categories/${category}`)"
          >
            {{ category }}
          </a>
        </div>
      </div>
    </header>
    <div class="page__content">
      <Content />
    </div>
    <div class="page__footer page-footer">
      <span>TODO: page footer meta</span>
    </div>
  </article>
</template>

<script lang="ts">
import { usePageFrontmatter, usePageData } from "@vuepress/client"

const dateFormatter = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

export default {
  setup(props, ctx) {
    const frontmatter = usePageFrontmatter()
    const pagedata = usePageData()

    const title = frontmatter.value.title || pagedata.value.title
    const createdDate = frontmatter.value.date || Date.now()
    const updatedDate = (frontmatter.value?.updated as string) ?? createdDate
    const created = dateFormatter(new Date(createdDate))
    const updated = dateFormatter(new Date(updatedDate))
    const showUpdate = created !== updated

    // TODO categories locale, eject and url transform (remove %20 and UpperCase)
    const categories = Array.isArray(frontmatter.value.categories)
      ? (frontmatter.value.categories as string[]) || ["Default"]
      : ([frontmatter.value.categories] as string[])

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
