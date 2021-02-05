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
      <Footer />
    </footer>
  </div>
</template>

<script lang="ts">
import Page from "../components/Page.vue"
import Navbar from "../components/Navbar.vue"
import Header from "../components/Header.vue"
import Sidebar from "../components/Sidebar.vue"
import Catalog from "../components/Catalog.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Page,
    Navbar,
    Header,
    Sidebar,
    Catalog,
    Footer,
  },
}
</script>

<style>
</style>