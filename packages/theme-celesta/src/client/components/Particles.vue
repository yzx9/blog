<template>
  <div :id="id" class="particles" />
</template>

<script lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue"
import type { PropType } from "vue"
import { tsParticles } from "tsparticles"
import type { Container, ISourceOptions } from "tsparticles"

const presetMap = ({
  chars: import("../assets/particles-preset-chars.json"),
  connect: import("../assets/particles-preset-connect.json"),
  nasa: import("../assets/particles-preset-nasa.json"),
  nyancat2: import("../assets/particles-preset-nyancat2.json"),
  polygonMask: import("../assets/particles-preset-polygonMask.json"),
  shadow: import("../assets/particles-preset-shadow.json"),
  snow: import("../assets/particles-preset-snow.json"),
  starry: import("../assets/particles-preset-starry.json"),
} as unknown) as Record<string, Promise<ISourceOptions>>

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
          const option = await optionsRef.value
          containerRef.value?.destroy()
          containerRef.value = await tsParticles.load(id, option)
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
