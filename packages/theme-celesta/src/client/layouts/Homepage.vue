<template>
  <BaseLayout class="layout_homepage">
    <template #header>
      <div
        class="flex flex-col h-screen pb-12 justify-center items-center relative overflow-hidden"
      >
        <h1 class="home-title text-8xl text-white pb-10 z-30">{{ title }}</h1>
        <h2 class="text-4xl text-white z-30">{{ description }}</h2>
      </div>
    </template>

    <template #main>
      <Posts />
    </template>

    <template #sub>
      <Tags class="m-4 ml-8" @click="slug => $router.push(`/tags/${slug}.html`)" />
    </template>

    <template #extra>
      <!-- <Catalog /> -->
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../components/BaseLayout.vue"
import Posts from "../components/PostsOverWhole.vue"
import Tags from "../components/Tags.vue"
import { computed } from "vue"
import { useSiteLocaleData } from "@vuepress/client"

const siteLocaleData = useSiteLocaleData()
const title = computed(() => siteLocaleData.value.title)
const description = computed(() => siteLocaleData.value.description)
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");

.layout_homepage {
  --header-height: 100vh;
}

.home-title {
  font-family: "Kaushan Script", cursive;
}
</style>
