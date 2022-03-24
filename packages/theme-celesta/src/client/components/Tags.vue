<template>
  <div class="tags">
    <span
      v-for="{ slug, name, color, isActive } in tags"
      :key="`v-tag-${slug}`"
      class="tags__tag"
      :class="{ 'tags__tag--active': isActive }"
      :style="{
        // @ts-ignore
        '--tag-color': color
      }"
      @click="handleClick(slug)"
    >{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { useTags } from "@celesta/vuepress-plugin-celesta/lib/client"
import { toReadableCase } from "@celesta/shared"
import { computed } from "vue"
import { colors, getVisiableColorByHash } from "../utils"
import type { PropType } from "vue"

const inactiveColor = colors.Grey
const emit = defineEmits(["update:actives"])
const props = defineProps({
  actives: { type: Array as PropType<string[]>, default: [] },
  singleChoice: { type: Boolean, default: false }
})

const { allTags } = useTags()
const tags = computed(() => allTags.value.map(tag => ({
  ...tag,
  name: tag.name === tag.slug ? toReadableCase(tag.name) : tag.name,
  color: getVisiableColorByHash(tag.slug),
  isActive: props.actives.length ? props.actives.includes(tag.slug) : true
})))

function handleClick(slug: string) {
  const index = props.actives.findIndex(a => a === slug)
  const newActives = props.singleChoice
    ? index === -1
      ? [slug]
      : []
    : index === -1
      ? [...props.actives, slug]
      : props.actives.slice(0, index).concat(props.actives.slice(index + 1))
  emit("update:actives", newActives)
}
</script>

<style lang="postcss">
.tags {
  @apply p-1 flex flex-wrap;
}

.tags__tag {
  @apply m-1 px-3 py-1 rounded-full text-white cursor-pointer;
  @apply transition-all duration-300;

  --tag-bg-color: v-bind(inactiveColor);
  --tag-opacity: 0.7;

  background-color: var(--tag-bg-color);
  opacity: var(--tag-opacity);

  &:hover {
    --tag-bg-color: var(--tag-color);
    --tag-opacity: 1;
  }
}

.tags__tag--active {
  --tag-bg-color: var(--tag-color);
}
</style>
