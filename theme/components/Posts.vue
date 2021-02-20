<template>
  <div class="posts">
    <div v-for="post in posts" class="posts__item">
      <RouterLink :to="post.path" class="posts__title">{{
        post.title
      }}</RouterLink>
      <p class="posts__excerpt">{{ post.excerpt }}</p>
      <RouterLink :to="post.path" class="posts__button">阅读全文</RouterLink>
    </div>
  </div>
  <Pagination v-model:current="paginationOption.currentPage" :total="total" />
</template>

<script lang="ts">
import { reactive, toRefs } from "vue"
import Pagination from "./Pagination.vue"
import { usePostsPagination } from "../composables"
import type { PaginationOptions } from "../composables"

export default {
  components: {
    Pagination,
  },
  async setup(props, ctx) {
    const paginationOption: PaginationOptions = reactive({
      currentPage: 1,
    })

    const { posts, total } = toRefs(await usePostsPagination(paginationOption))

    return {
      posts,
      total,
      paginationOption,
    }
  },
}
</script>
