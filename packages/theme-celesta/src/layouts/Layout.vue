<template>
  <BaseLayout>
    <template #header>
      <Header />
    </template>

    <template #main>
      <Page />
    </template>

    <template #sub>
      <Sidebar />
    </template>

    <template #extra>
      <Catalog />
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import BaseLayout from "./BaseLayout.vue"
import Page from "../components/Page.vue"
import Header from "../components/Header.vue"
import Sidebar from "../components/Sidebar.vue"
import Catalog from "../components/Catalog.vue"

export default {
  components: {
    BaseLayout,
    Page,
    Header,
    Sidebar,
    Catalog,
  },
}
</script>
