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
  <div class="posts__pagination">
    <span v-for="i in 5" @click="onPageChange(i)">{{ i }}</span>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue"
import { usePostsPagination } from "../composables"

export default {
  async setup(props, ctx) {
    const paginationOption = reactive({
      currentPage: 1,
    })

    const posts = await usePostsPagination(paginationOption)
    const onPageChange = (i: number) => (paginationOption.currentPage = i)

    return {
      posts,
      onPageChange,
    }
  },
}
</script>
