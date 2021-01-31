<template>
  <teleport to="body">
    <nav class="layout__navbar">
      <Navbar />
    </nav>
  </teleport>

  <div class="layout">
    <div class="layout__wrapper">
      <aside class="layout__sidebar">
        <Sidebar />
      </aside>
      <main class="layout__page">
        <Page />
      </main>
      <aside class="layout__toolbar">
        <Toolbar />
      </aside>
    </div>

    <footer class="layout__footer">
      <Footer />
    </footer>
  </div>

  <teleport to="body">
    <div class="layout__background">
      <Background />
    </div>
  </teleport>
</template>

<script >
import Page from "../components/Page.vue"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import Sidebar from "../components/Sidebar.vue"
import Toolbar from "../components/Toolbar.vue"
import Background from "../components/Background.vue"

export default {
  components: {
    Page,
    Navbar,
    Footer,
    Sidebar,
    Toolbar,
    Background,
  },
  setup(props, ctx) {
    return {}
  },
}
</script>

<style>
</style>