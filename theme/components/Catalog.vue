<template>
  <div class="sticky top-12 p-4">
    <h3 class="text-lg font-bold select-none">CATALOG</h3>

    <ul v-for="item in items">
      <CatalogItem :item="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import { usePageData } from "@vuepress/client"
import { ThemePageData } from "../types"
import CatalogItem from "./CatalogItem.vue"

export default {
  components: {
    CatalogItem,
  },
  setup(props, ctx) {
    const { headers } = usePageData<ThemePageData>().value

    return {
      items: headers,
    }
  },
}
</script>
