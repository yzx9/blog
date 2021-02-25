<template>
  <div :id="id" class="particles" />
</template>

<script lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue"
import type { PropType } from "vue"
import { tsParticles } from "tsparticles"
import type { Container, ISourceOptions } from "tsparticles"

import chars from "../assets/particles-preset-chars.json"
import connect from "../assets/particles-preset-connect.json"
import nasa from "../assets/particles-preset-nasa.json"
import nyancat2 from "../assets/particles-preset-nyancat2.json"
import polygonMask from "../assets/particles-preset-polygonMask.json"
import shadow from "../assets/particles-preset-shadow.json"
import snow from "../assets/particles-preset-snow.json"
import starry from "../assets/particles-preset-starry.json"

const presetMap = {
  chars,
  connect,
  nasa,
  nyancat2,
  polygonMask,
  shadow,
  snow,
  starry,
} as Record<string, ISourceOptions>

let count = 0
const random = function <T>(map: Record<string, T>) {
  const i = Math.floor(Math.random() * Object.keys(map).length)
  return map[Object.keys(map)[i]]
}

export default {
  props: {
    preset: {
      type: String as PropType<"random" | keyof typeof presetMap>,
      validator: (preset: string) =>
        preset === "random" || Object.keys(presetMap).includes(preset),
    },
    presets: {
      type: Array as PropType<(keyof typeof presetMap)[]>,
      validator: (presets: string[]) =>
        presets.every((preset) => Object.keys(presetMap).includes(preset)),
    },
    options: {
      type: Object as PropType<ISourceOptions>,
    },
  },
  setup(props, ctx) {
    const id = `particles-${count++}`
    const containerRef = ref<Container | undefined>(undefined)

    const presetsRef = computed(() => {
      return (
        props.presets?.reduce(
          (map, a) => ({ ...map, [a]: presetMap[a] }),
          {}
        ) || presetMap
      )
    })

    const presetRef = computed(() => {
      return props.preset && props.preset !== "random"
        ? presetsRef.value[props.preset]
        : random(presetsRef.value)
    })

    const optionsRef = computed(() => props.options || presetRef.value)

    onMounted(() =>
      watch(
        optionsRef,
        async () => {
          containerRef.value?.destroy()
          containerRef.value = await tsParticles.load(id, optionsRef.value)
          ctx.emit("change", containerRef.value)
        },
        { immediate: true }
      )
    )

    onUnmounted(() => containerRef.value?.destroy())

    return { id }
  },
}
</script>
