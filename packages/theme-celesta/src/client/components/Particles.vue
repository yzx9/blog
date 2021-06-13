<template>
  <div :id="id" class="particles"></div>
</template>

<script lang="ts">
let count = 0
</script>

<script setup lang="ts">
import { defineEmit, defineProps, ref, onMounted, onUnmounted, watch } from "vue"
import { tsParticles } from "tsparticles"
import type { PropType } from "vue"
import type { Container, ISourceOptions } from "tsparticles"

const emit = defineEmit(["change"])
const props = defineProps({
  preset: {
    type: [String, Object, Array] as PropType<string | string[] | ISourceOptions | ISourceOptions[]>,
    default: "https://particles.js.org/presets/default.json"
  }
})

const id = `particles-${count++}`
const container = ref<Container | undefined>(undefined)

onMounted(() =>
  watch(
    props,
    async ({ preset }) => {
      container.value?.destroy()

      const presets = Array.isArray(preset) ? preset : [preset]
      const index = Math.floor(Math.random() * presets.length)
      try {
        container.value = typeof presets[0] === "string"
          ? await tsParticles.loadJSON(id, presets as string[], index)
          : await tsParticles.loadFromArray(id, presets as ISourceOptions[], index)

        emit("change", container.value)
      } catch (e) {
        console.log(e)
      }
    },
    { immediate: true }
  )
)

onUnmounted(() => container.value?.destroy())
</script>
