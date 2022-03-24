<template>
  <div class="flex-col">
    <template v-for="post in pagination.pages">
      <div
        class="p-8 my-4 flex flex-col transition-all duration-300 rounded items-center hover:border hover:shadow-md"
      >
        <RouterLink
          class="p-2 text-2xl transition-colors hover:text-primary-500"
          :to="post.path"
        >{{ post.title }}</RouterLink>

        <p class="text-base text-gray-500">{{ post.excerpt }}</p>
        <RouterLink
          class="mt-2 p-2 px-4 text-center select-none border rounded-full transition-colors hover:text-white hover:border-primary-500 hover:bg-primary-500"
          :to="post.path"
        >阅读全文</RouterLink>
      </div>
    </template>
  </div>

  <Pagination v-model:current="options.currentPage" :total="pagination.total" />
</template>

<script setup lang="ts">
import Pagination from "./Pagination.vue"
import { computed, reactive } from "vue"
import { usePagination } from "@celesta/vuepress-plugin-celesta/lib/client"
import type { PaginationOptions } from "@celesta/vuepress-plugin-celesta"

const props = defineProps<{
  options?: PaginationOptions
}>()

const options = reactive({
  currentPage: 1,
  pageSize: 10,
})

const realOptions = computed<PaginationOptions>(() => Object.assign({}, options, props.options ?? {}))
const pagination = usePagination(realOptions)
</script>
