<template>
  <teleport to="body">
    <nav class="layout__navbar">
      <Navbar />
    </nav>
  </teleport>

  <div class="layout">
    <header class="layout__header">
      <div class="header">
        <h1 class="header__title header__title--primary">{{ title }}</h1>
        <h2 class="header__description">{{ description }}</h2>
        <Particles class="header__background" preset="starry" />
      </div>
    </header>

    <div class="layout__wrapper">
      <aside class="layout__sidebar">
        <!-- <Sidebar /> -->
      </aside>
      <main class="layout__page">
        <Suspense>
          <Posts />
        </Suspense>
      </main>
      <aside class="layout__catalog">
        <!-- <Catalog /> -->
      </aside>
    </div>

    <footer class="layout__footer">
      <Footer />
    </footer>
  </div>
</template>

<script lang="ts">
import { computed } from "vue"
import { useSiteLocaleData } from "@vuepress/client"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import Particles from "../components/Particles.vue"
import Posts from "../components/Posts.vue"

export default {
  components: {
    Navbar,
    Footer,
    Particles,
    Posts,
  },
  setup(props, ctx) {
    const siteLocaleData = useSiteLocaleData()
    const title = computed(() => siteLocaleData.value.title)
    const description = computed(() => siteLocaleData.value.description)

    return {
      title,
      description,
    }
  },
}
</script>
