<template>
  <BaseLayout>
    <template #header>
      <Header>
        <h1 class="header__title header__title--primary">{{ title }}</h1>
        <h2 class="header__description">{{ description }}</h2>
      </Header>
    </template>

    <template #main>
      <Suspense>
        <Posts />
      </Suspense>
    </template>

    <template #sub>
      <!-- <Sidebar /> -->
    </template>

    <template #extra>
      <!-- <Catalog /> -->
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { computed } from "vue"
import { useSiteLocaleData } from "@vuepress/client"
import BaseLayout from "./BaseLayout.vue"
import Header from "../components/Header.vue"
import Posts from "../components/Posts.vue"

export default {
  components: {
    BaseLayout,
    Header,
    Posts,
  },
  setup(props, ctx) {
    const siteLocaleData = useSiteLocaleData()
    const title = computed(() => siteLocaleData.value.title)
    const description = computed(() => siteLocaleData.value.description)

    return {
      title,
      description,
    }
  },
}
</script>
