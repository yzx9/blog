<template>
  <BaseLayout>
    <template #header>
      <div class="header h-full flex flex-col justify-center items-center relative overflow-hidden">
        <div class="flex flex-col items-start">
          <h1 class="my-6 z-30 text-white text-8xl font-medium">Categories</h1>
        </div>
      </div>
    </template>

    <template #main>
      <PostsOverExcerpt :options="options" />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../components/BaseLayout.vue"
import PostsOverExcerpt from "../components/PostsOverExcerpt.vue"
import { computed, reactive, watch } from "vue"
import { useRouter } from "vue-router"

const options = reactive({
  categories: [] as string[]
})

const router = useRouter()
const isCategoriesPage = computed(() => !router.currentRoute.value.path.endsWith("categories.html"))

watch(router.currentRoute, ({ path }) => {
  if (isCategoriesPage.value) {
    const slug = path.split("/").pop()!.replace(/.html$/, "")
    options.categories.push(slug)
  }
}, { immediate: true })
</script>
