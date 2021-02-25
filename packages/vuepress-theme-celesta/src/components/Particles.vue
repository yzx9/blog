<template>
  <div :id="id" class="particles" />
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, watch, PropType } from "vue"
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

    onMounted(() =>
      watch(
        props,
        async () => {
          const presets =
            props.presets?.reduce(
              (map, a) => ({ ...map, [a]: presetMap[a] }),
              {}
            ) || presetMap

          const preset =
            props.preset && props.preset !== "random"
              ? presets[props.preset]
              : random(presets)

          const options = props.options || preset

          containerRef.value?.destroy()
          containerRef.value = await tsParticles.load(id, options)
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
