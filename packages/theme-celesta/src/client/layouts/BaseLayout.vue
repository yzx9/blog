<template>
  <div class="layout">
    <main class="layout__main">
      <slot name="main"></slot>
    </main>

    <aside class="layout__sub">
      <slot name="sub"></slot>
    </aside>

    <aside class="layout__extra">
      <slot name="extra"></slot>
    </aside>

    <header class="layout__header">
      <slot name="header"></slot>
    </header>

    <footer class="layout__footer">
      <slot name="footer">
        <TheFooter />
      </slot>
    </footer>

    <Teleport to="#app">
      <nav class="layout__nav overflow-hidden z-50">
        <slot name="nav">
          <TheNavbar />
        </slot>
      </nav>

      <ClientOnly>
        <Particles class="layout__background" preset="starry" />
      </ClientOnly>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import TheNavbar from "../components/Navbar.vue"
import TheFooter from "../components/Footer.vue"
import Particles from "../components/Particles.vue"
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
}

.layout__main {
  @apply z-30;
  grid-area: main;
  background: var(--bg-color);
}

.layout__sub {
  grid-area: sub;
  background: var(--bg-color);
}

.layout__extra {
  grid-area: extra;
  background: var(--bg-color);
}

.layout__header {
  grid-area: header;
}

.layout__footer {
  grid-area: footer;
  background: var(--bg-color);
}

.layout__nav {
  @apply z-50;
}

.layout__background {
  @apply fixed top-0 left-0 h-screen w-screen;

  z-index: -1;
}
</style>
