<template>
  <article class="page">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <Content />
  </article>
</template>

<script lang="ts">
import { usePageFrontmatter, usePageData } from "@vuepress/client"

export default {
  setup(props, ctx) {
    const frontmatter = usePageFrontmatter()
    const pagedata = usePageData()

    const title = frontmatter.value.title || pagedata.value.title

    return {
      title,
    }
  },
}
</script>
