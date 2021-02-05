<template>
  <teleport to="body">
    <nav class="layout__navbar">
      <Navbar />
    </nav>
  </teleport>

  <div class="layout">
    <header class="layout__header">
      <Header />
    </header>

    <div class="layout__wrapper">
      <aside class="layout__sidebar">
        <Sidebar />
      </aside>
      <main class="layout__page">
        <Page />
      </main>
      <aside class="layout__catalog">
        <Catalog />
      </aside>
    </div>

    <footer class="layout__footer">
      <div class="footer">
        <span>{{ copyright }}</span>
        <span
          >Powered by
          <a href="https://vuepress.vuejs.org/" target="_blank"
            >Vuepress</a
          ></span
        >
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Page from "../components/Page.vue"
import Navbar from "../components/Navbar.vue"
import Header from "../components/Header.vue"
import Sidebar from "../components/Sidebar.vue"
import Catalog from "../components/Catalog.vue"

export default {
  components: {
    Page,
    Navbar,
    Header,
    Sidebar,
    Catalog,
  },
  setup(props, ctx) {
    const currentYear = new Date(Date.now()).getFullYear()
    const author = "Celeste"

    const copyrightRaw = "Copyright © 2021 – :year :author"
    const copyright = copyrightRaw
      .replace(":year", currentYear.toString())
      .replace(":author", author)

    return { copyright }
  },
}
</script>

<style>
</style>