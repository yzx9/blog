<template>
  <BaseLayout>
    <template #header>
      <TheHeader />
    </template>

    <template #main>
      <Page />
    </template>

    <template #sub>
      <TheSidebar />
    </template>

    <template #extra>
      <TheCatalog />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "./BaseLayout.vue"
import Page from "../components/Page.vue"
import TheHeader from "../components/Header.vue"
import TheSidebar from "../components/Sidebar.vue"
import TheCatalog from "../components/Catalog.vue"
</script>
