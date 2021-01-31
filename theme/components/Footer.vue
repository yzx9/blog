<template>
  <div class="footer">
    <div class="footer__copyright">
      © 2021 – {{ currentYear }} Celeste | Powered by Vuepress
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup(props, ctx) {
    const currentYear = new Date(Date.now()).getFullYear()
    return { currentYear }
  },
}
</script>
