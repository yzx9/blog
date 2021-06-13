<template>
  <div :id="id" class="particles"></div>
</template>

<script lang="ts">
let count = 0
</script>

<script setup lang="ts">
import { defineEmit, defineProps, ref, onMounted, onUnmounted, watch } from "vue"
import { withBase } from "@vuepress/client"
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

      if (typeof presets[0] === "string") {
        const paths = presets as string[]
        const jsons = paths.map(a => ["http", "https"].some(b => a.startsWith(b)) ? a : withBase(a))
        container.value = await tsParticles.loadJSON(id, jsons, index)
      } else {
        const options = presets as ISourceOptions[]
        container.value = await tsParticles.loadFromArray(id, options, index)
      }
      emit("change", container.value)
    },
    { immediate: true }
  )
)

onUnmounted(() => container.value?.destroy())
</script>
