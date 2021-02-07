<template>
  <div class="catalog">
    <h3 class="catalog__title">Catalog</h3>

    <ul v-for="item in items" class="catalog__list">
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
