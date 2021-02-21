<template>
  <li class="m-1">
    <RouterLink
      class="text-gray-500 hover:text-primary-500 transition-colors duration-300"
      :class="{ 'text-primary-500': isActive }"
      :to="{ hash }"
      replace
      >{{ title }}</RouterLink
    >

    <ul class="pl-4 mb-2">
      <CatalogItem
        v-for="child in item.children"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, PropType } from "vue"
import { useRouter } from "vue-router"
import { PageHeader } from "@vuepress/client"
import { decodeHTML } from "../utils"

export default {
  name: "CatalogItem",
  props: {
    item: {
      type: Object as PropType<PageHeader>,
      required: true,
    },
    depth: {
      type: Number,
      default: 1,
    },
  },
  setup(props, ctx) {
    const { currentRoute } = useRouter()
    const item = props.item

    const title = computed(() => decodeHTML(item.title))
    const hash = computed(() => `#${item.slug}`)
    const isActive = computed(() => currentRoute.value.hash === hash.value)

    return { title, hash, isActive }
  },
}
</script>
