<template>
  <article class="page">
    <div class="page__content">
      <Content />
    </div>
    <div class="page__footer page-footer">
      <RouterLink
        v-for="{ raw, name, path } in tags"
        :key="`v-page-${path}`"
        :to="path"
        class="page-header__tag"
      >
        {{ name }}
      </RouterLink>
    </div>
  </article>
</template>

<script lang="ts">
import { useLocaleTags } from "../composables"

export default {
  setup(props, ctx) {
    const tags = useLocaleTags()

    return {
      tags,
    }
  },
}
</script>
