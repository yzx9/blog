<template>
  <li class="catalog__item" :class="{ 'catalog__item--active': active }">
    <RouterLink class="catalog__link" :to="{ hash }" replace>{{ title }}</RouterLink>

    <ul v-if="active" class="pl-4">
      <CatalogItem v-for="child in item.children" :item="child" :depth="depth + 1" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue"
import { useRouter } from "vue-router"
import { decodeHTML } from "../utils"
import type { PageHeader } from "@vuepress/client"
import type { PropType } from "vue"

const props = defineProps({
  item: {
    type: Object as PropType<PageHeader>,
    required: true,
  },
  depth: {
    type: Number,
    default: 1,
  },
})

const { currentRoute } = useRouter()
const { item } = props

const title = computed(() => decodeHTML(item.title))
const hash = computed(() => `#${item.slug}`)

const isActive = (pageHeader: PageHeader) =>
  currentRoute.value.hash === `#${pageHeader.slug}`
const active = computed(
  () => isActive(item) || item.children.some(isActive)
)
</script>

<style lang="postcss">
.catalog__item {
  @apply p-1 pl-2 border-l transition-colors duration-300;

  & .catalog__item {
    @apply border-transparent;
  }

  &.catalog__item--active {
    @apply border-l border-primary-300;

    & .catalog__item {
      @apply border-transparent;
    }

    & > .catalog__link {
      @apply text-primary-500;
    }
  }
}

.catalog__link {
  @apply text-gray-500 hover:text-primary-500 transition-colors duration-300;
}
</style>
