<template>
  <footer class="footer">
    <div class="footer__copyright">
      © 2021 – {{ currentYear }} Celeste | Powered by Vuepress
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  setup(props, ctx) {
    const currentYear = new Date(Date.now()).getFullYear()
    return { currentYear }
  },
}
</script>

<style lang="scss">
</style>
