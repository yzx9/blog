<template>
  <teleport to="body">
    <nav class="layout__navbar">
      <slot name="navbar">
        <Navbar />
      </slot>
    </nav>
  </teleport>

  <div class="layout">
    <header class="layout__header">
      <slot name="header" />
    </header>

    <div class="layout__wrapper">
      <aside class="layout__sub">
        <slot name="sub" />
      </aside>
      <main class="layout__main">
        <slot name="main" />
      </main>
      <aside class="layout__extra">
        <slot name="extra" />
      </aside>
    </div>

    <footer class="layout__footer">
      <slot name="footer">
        <Footer />
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>
