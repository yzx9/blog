<template>
  <div class="layout">
    <main class="layout__main">
      <slot name="main" />
    </main>

    <aside class="layout__sub">
      <slot name="sub" />
    </aside>

    <aside class="layout__extra">
      <slot name="extra" />
    </aside>

    <header class="layout__header">
      <slot name="header" />
    </header>

    <footer class="layout__footer">
      <slot name="footer">
        <Footer />
      </slot>
    </footer>

    <nav class="overflow-hidden z-50">
      <slot name="nav">
        <Navbar />
      </slot>
    </nav>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
</script>

<style lang="postcss">
.layout {
  @apply z-10 min-h-screen;

  display: grid;
  grid:
    "header header header" var(--header-height)
    "sub    main   extra " auto
    "footer footer footer" auto
    / 1fr var(--main-width) 1fr;
  gap: 1rem;

  background: var(--bg-color);
}

.layout__main {
  grid-area: main;
}

.layout__sub {
  grid-area: sub;
}

.layout__extra {
  grid-area: extra;
}

.layout__header {
  grid-area: header;
}

.layout__footer {
  grid-area: footer;
}
</style>
