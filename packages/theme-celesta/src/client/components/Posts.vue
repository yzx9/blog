<template>
  <div class="posts flex-col">
    <template v-for="post in pagination.pages">
      <div class="posts__card">
        <RouterLink
          class="p-2 pl-6 text-4xl font-bold transition-colors hover:text-primary-500"
          :to="post.path"
        >{{ post.title }}</RouterLink>

        <Page class="page_title-hidden" :pageKey="post.key" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Page from "./Page.vue"
import { debounce } from "ts-debounce"
import { computed, reactive, ref, watch } from "vue"
import { useScroll } from "../composables"
import { usePagination } from "@celesta/vuepress-plugin-celesta/lib/client"
import type { PaginationOptions } from "@celesta/vuepress-plugin-celesta"

const pageSize = ref(1)
const options: PaginationOptions = reactive({
  currentPage: 1,
  pageSize,
})
const pagination = usePagination(options)

const THRESHOLD = 200
const { bottom } = useScroll()
const loadAllPost = computed(() => pageSize.value === pagination.total)

const infiniteScrollEvent = debounce(() => {
  pageSize.value++
}, 500, { isImmediate: true })

watch(bottom, val => {
  if (!loadAllPost.value && val < THRESHOLD) infiniteScrollEvent()
})
</script>

<style lang="postcss">
.posts {
  margin-top: -5rem;
}

.posts__card {
  @apply p-8 mt-4 mb-6 flex flex-col transition-all duration-300;
  @apply rounded-xl shadow-xl z-40;

  background: var(--bg-color);
}

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
