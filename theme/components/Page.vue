<template>
  <article class="page">
    <div class="page__content prose max-w-none">
      <Content />
    </div>
    <div class="page__footer page-footer">
      <RouterLink
        v-for="{ name, path } in tags"
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

<style lang="postcss">
.page__content {
  @apply p-10;

  & a.header-anchor {
    @apply text-primary-500;

    font-size: 0.85em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
    opacity: 0;

    &:hover {
      text-decoration: none;
    }
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    &:hover .header-anchor {
      opacity: 1;
    }
  }
}
</style>
