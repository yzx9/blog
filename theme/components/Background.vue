<template>
  <div class="background">
    <Particles preset="shadow" />
  </div>
</template>

<script lang="ts">
import Particles from "./Particles.vue"

/**
 * TODOs
 * - BUG: cannot handle click event due to z-index
 * - random preset when user open website
 * - preset appoint by props
 * - preset color -> support css variable (maybe we can support online palette)
 */
export default {
  components: {
    Particles,
  },
}
</script>

<style>
.background {
  min-height: 100vh;
}
</style>
