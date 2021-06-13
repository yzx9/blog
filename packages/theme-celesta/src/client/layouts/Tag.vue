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
      <Tags v-model:actives="options.tags" class="m-2 mt-4" :single-choice="isTagPage" />
      <PostsOverExcerpt :options="options" />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "../components/BaseLayout.vue"
import Tags from "../components/Tags.vue"
import PostsOverExcerpt from "../components/PostsOverExcerpt.vue"
import { computed, reactive, watch } from "vue"
import { useRouter } from "vue-router"

const options = reactive({
  tags: [] as string[]
})

const router = useRouter()
const isTagPage = computed(() => !router.currentRoute.value.path.endsWith("tags.html"))

watch(router.currentRoute, ({ path }) => {
  if (isTagPage.value) {
    const slug = path.split("/").pop()!.replace(/.html$/, "")
    options.tags.push(slug)
  }
}, { immediate: true })

watch(options, ({ tags }) => {
  if (isTagPage.value) {
    const url = tags.length ? `/tags/${tags[0]}.html` : `/tags.html`
    router.push(url)
  }
})
</script>
