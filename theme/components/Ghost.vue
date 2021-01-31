<template>
  <div ref="ghost" class="ghost">
    <div class="ghost__body">
      <div class="ghost__face">
        <div class="ghost__eye ghost__eye--left" :style="eyes.left" />
        <div class="ghost__eye ghost__eye--right" :style="eyes.right" />
        <div class="ghost__smile" />
        <div class="ghost__rosy ghost__rosy--left" />
        <div class="ghost__rosy ghost__rosy--right" />
      </div>
      <div class="ghost__arm ghost__arm--left" />
      <div class="ghost__arm ghost__arm--right" />
      <div class="ghost__bottom">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
    <div class="ghost__shadow" />
  </div>
</template>

<script lang="ts">
import { computed, ref, Ref } from "vue"
import { useMouse } from "../composables"

// 偏移半径
const R = 3

// 声明左眼圆心(X1,Y1)、右眼圆心(X2,Y2)
const X1 = 13
const Y1 = 11
const X2 = 61
const Y2 = 11

export default {
  setup(props, ctx) {
    const ghost = ref<HTMLElement | null>(null)
    const mouse = useMouse()

    const offset = computed(() => ({
      left: ghost.value?.offsetLeft || 0,
      top: ghost.value?.offsetTop || 0,
    }))

    const angle = computed(() => ({
      left: Math.atan2(
        mouse.x - X1 - offset.value.left,
        mouse.y - Y1 - offset.value.top
      ),
      right: Math.atan2(
        mouse.x - X2 - offset.value.left,
        mouse.y - Y2 - offset.value.top
      ),
    }))

    const eyes = computed(() => {
      const left1 = R * Math.sin(angle.value.left) + X1 - 10
      const top1 = R * Math.cos(angle.value.left) + Y1 - 10

      const left2 = R * Math.sin(angle.value.right) + X2 - 10
      const top2 = R * Math.cos(angle.value.right) + Y2 - 10

      return {
        left: {
          left: `${left1}px`,
          top: `${top1}px`,
        },
        right: {
          left: `${left2}px`,
          top: `${top2}px`,
        },
      }
    })

    return {
      eyes,
    }
  },
}
</script>
