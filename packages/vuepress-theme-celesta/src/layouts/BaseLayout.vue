<template>
  <teleport to="body">
    <nav class="overflow-hidden z-50">
      <slot name="navbar">
        <Navbar />
      </slot>
    </nav>
  </teleport>

  <div class="layout z-10 min-h-screen">
    <header class="layout__header">
      <slot name="header" />
    </header>

    <div class="flex justify-center">
      <aside class="layout__sub flex flex-col items-end flex-1">
        <slot name="sub" />
      </aside>
      <main class="layout__main mx-4">
        <slot name="main" />
      </main>
      <aside class="layout__extra flex flex-col items-start flex-1">
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

<style lang="postcss">
.layout {
  background: var(--bg-color);
}

.layout__header {
  height: var(--header-height);
}

.layout__main {
  width: var(--main-width);
}
</style>
