<template>
  <Navbar />
  <Page />
  <Footer />
</template>

<script >
import Page from "../components/Page.vue"
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Page,
    Navbar,
    Footer,
  },
  setup(props, ctx) {
    return {}
  },
}
</script>

<style>
</style>