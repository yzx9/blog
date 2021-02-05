<template>
  <div id="particles" class="particles" />
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { tsParticles } from "tsparticles"
import type { Container, ISourceOptions } from "tsparticles"
import ParticlePresetNasa from "../assets/particles-preset-nasa.json"

export default {
  setup(props, ctx) {
    const particlesOptions = ParticlePresetNasa as ISourceOptions
    const containerRef = ref<Container | undefined>(undefined)

    onMounted(async () => {
      containerRef.value = await tsParticles.load("particles", particlesOptions)
    })

    onBeforeUnmount(() => containerRef.value?.destroy())

    return {}
  },
}
</script>
