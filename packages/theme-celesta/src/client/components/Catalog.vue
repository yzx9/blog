<template>
  <div class="sticky top-12 p-4 mr-8">
    <h3 class="pb-1 text-lg font-bold select-none">CATALOG</h3>

    <ul>
      <CatalogItem v-for="item in items" :item="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import CatalogItem from "./CatalogItem.vue"
import { usePageData } from "@vuepress/client"
import type { ThemePageData } from "../../types"

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
