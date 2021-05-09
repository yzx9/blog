<template>
  <BaseLayout>
    <template #header>
      <Header>
        <h1 class="home-title text-8xl text-white pb-10 z-30">{{ title }}</h1>
        <h2 class="text-4xl text-white z-30">{{ description }}</h2>
      </Header>
    </template>

    <template #main>
      <Posts />
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");

.home-title {
  font-family: "Kaushan Script", cursive;
}
</style>
