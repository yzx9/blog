<template>
  <BaseLayout>
    <template #header>
      <div class="header h-full flex flex-col justify-center items-center relative overflow-hidden">
        <div class="flex flex-col items-start">
          <h1 class="my-6 z-30 text-white text-8xl font-medium">Tags</h1>
        </div>
      </div>
    </template>

    <template #main>
      <Tags v-if="isTagsPage" class="m-2 mt-4" />
      <PostsOverExcerpt />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../components/BaseLayout.vue"
import Tags from "../components/Tags.vue"
import PostsOverExcerpt from "../components/PostsOverExcerpt.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const isTagsPage = computed(() => route.path.endsWith("/tags.html"))
</script>
