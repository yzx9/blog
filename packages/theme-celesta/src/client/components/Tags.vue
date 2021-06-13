<template>
  <div class="tags">
    <span
      v-for="{tag, color} in tags"
      :key="`v-tag-${tag.slug}`"
      class="tags__tag"
      :style="{
        // @ts-ignore
        '--tag-color': color
      }"
      @click="handleClick(tag.slug)"
    >{{ tag.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { useTags } from "@celesta/vuepress-plugin-celesta/lib/client"
import { computed, defineEmit } from "@vue/runtime-core";
import { getColor } from "../utils"

const emit = defineEmit(["click"])

const { allTags } = useTags()
const tags = computed(() => allTags.value.map(tag => ({ tag, color: getColor(tag.slug) })))

function handleClick(slug: string) {
  emit("click", slug)
}
</script>

<style lang="postcss">
.tags {
  @apply p-1 flex flex-wrap;
}

.tags__tag {
  @apply m-1 px-3 py-1 rounded-full text-white cursor-pointer;
  @apply transition-all duration-300;

  --tag-opacity: 0.7;
  background-color: rgba(var(--tag-color), var(--tag-opacity));

  &:hover {
    --tag-opacity: 1;
  }
}
</style>
