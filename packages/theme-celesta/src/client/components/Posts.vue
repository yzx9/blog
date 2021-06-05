<template>
  <div class="flex-col">
    <template v-for="post in pagination.pages">
      <div
        class="p-8 my-4 flex flex-col transition-all duration-300 rounded items-center hover:border hover:shadow-md"
      >
        <RouterLink
          class="p-2 text-4xl font-bold transition-colors hover:text-primary-500"
          :to="post.path"
        >{{ post.title }}</RouterLink>

        <Page class="page_title-hidden" :pageKey="post.key" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Page from "./Page.vue"
import { usePagination } from "@celesta/vuepress-plugin-celesta/lib/client"
import { debounce } from "ts-debounce"
import { computed, onMounted, onUnmounted, reactive, ref } from "vue"
import type { PaginationOptions } from "@celesta/vuepress-plugin-celesta"

const pageSize = ref(1)
const options: PaginationOptions = reactive({
  currentPage: 1,
  pageSize,
})
const pagination = usePagination(options)

const loadAllPost = computed(() => pageSize.value === pagination.total)

const infiniteScrollEvent = debounce(() => {
  pageSize.value++
}, 500, { isImmediate: true })
const infiniteScrollHandler = () => {
  if (!loadAllPost.value && window.scrollY + window.innerHeight + 200 > document.body.offsetHeight) {
    infiniteScrollEvent()
  }
}

onMounted(() => window.addEventListener("scroll", infiniteScrollHandler))
onUnmounted(() => window.removeEventListener("scroll", infiniteScrollHandler))
</script>

<style lang="postcss">
.page_title-hidden {
  & > h1:first-child {
    display: none;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    & .header-anchor {
      display: none;
    }
  }
}
</style>
