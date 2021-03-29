<template>
  <div class="flex-col">
    <template v-for="post in pagination.posts">
      <div
        class="p-8 my-4 flex flex-col transition-all duration-300 rounded items-center hover:border hover:shadow-md"
      >
        <RouterLink
          class="p-2 text-2xl transition-colors hover:text-primary-500"
          :to="post.path"
          >{{ post.title }}</RouterLink
        >

        <p class="text-base text-gray-500">
          {{ post.excerpt }}
        </p>
        <RouterLink
          class="mt-2 p-2 px-4 text-center select-none border rounded-full transition-colors hover:text-white hover:border-primary-500 hover:bg-primary-500"
          :to="post.path"
          >阅读全文</RouterLink
        >
      </div>
    </template>
  </div>
  <Pagination
    v-model:current="paginationOption.currentPage"
    :total="pagination.total"
  />
</template>

<script lang="ts">
import { reactive, ref, watch } from "vue"
import Pagination from "./Pagination.vue"
import { usePostsPagination } from "../composables"
import type { Ref } from "vue"
import type { PaginationOptions, PaginationData } from "../composables"

export default {
  components: {
    Pagination,
  },
  setup(props, ctx) {
    const paginationOption: PaginationOptions = reactive({
      currentPage: 1,
    })

    const pagination: Ref<PaginationData> = ref({
      posts: [],
      total: 0,
    })

    usePostsPagination(paginationOption).then((paginationData) => {
      const watcher = (a: PaginationData) => (pagination.value = a)
      watch(paginationData, watcher, { immediate: true })
    })

    return {
      pagination,
      paginationOption,
    }
  },
}
</script>
