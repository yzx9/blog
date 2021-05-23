<template>
  <div class="sticky top-12 p-4 mr-8">
    <h3 class="pb-1 text-lg font-bold select-none">CATALOG</h3>

    <ul>
      <CatalogItem v-for="item in headers" :item="item" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from "./CatalogItem.vue"
import { usePageData } from "@vuepress/client"
import type { ThemePageData } from "../../types"

const { headers } = usePageData<ThemePageData>().value
</script>
