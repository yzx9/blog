<template>
  <div ref="ghostRef" class="ghost">
    <div class="ghost__body">
      <div class="ghost__face">
        <div class="ghost__eyes">
          <div ref="eyeLeftRef" class="ghost__eye ghost__eye--left" />
          <div ref="eyeRightRef" class="ghost__eye ghost__eye--right" />
        </div>
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
import { onMounted, ref, watch } from "vue"
import { useMouse } from "../composables"
import type { Ref } from "vue"

// 偏移半径
const R = 3

// 左眼圆心(X1,Y1)
const X1 = 13
const Y1 = 11

// 右眼圆心(X2,Y2)
const X2 = 5
const Y2 = 11

export default {
  setup(props, ctx) {
    const ghostRef = ref<HTMLElement | null>(null)
    const eyeLeftRef = ref<HTMLElement | null>(null)
    const eyeRightRef = ref<HTMLElement | null>(null)

    const mouse = useMouse()

    onMounted(() => {
      const coords = {
        x: ghostRef.value?.offsetLeft || 0,
        y: ghostRef.value?.offsetTop || 0,
      }

      const createWatchCb = (
        eyeRef: Ref<HTMLElement | null>,
        X: number,
        Y: number
      ) => () => {
        const angle = Math.atan2(mouse.x - X - coords.x, mouse.y - Y - coords.y)
        const x = R * Math.cos(angle) + Y - 10
        const y = R * Math.sin(angle) + X - 10

        eyeRef.value?.style.setProperty("--offset-top", `${x}px`)
        eyeRef.value?.style.setProperty("--offset-left", `${y}px`)
      }

      watch(mouse, createWatchCb(eyeLeftRef, X1, Y1))
      watch(mouse, createWatchCb(eyeRightRef, X2, Y2))
    })

    return {
      ghostRef,
      eyeLeftRef,
      eyeRightRef,
    }
  },
}
</script>

<style lang="postcss">
.ghost {
  --animation-mode: 6s ease infinite;

  width: 10rem;
  height: 12.5rem;
  margin: 3rem 5rem;
}

.ghost__body {
  position: relative;
  width: 160px;
  height: 200px;
  border-top-right-radius: 80px;
  border-top-left-radius: 80px;
  background-color: #f0efda;
  animation: ghost-body-float var(--animation-mode);
}

@keyframes ghost-body-float {
  0%,
  100% {
    top: 0px;
  }

  40% {
    top: -40px;
  }
}

.ghost__face {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 67px;
  left: 37px;
  width: 72px;
  height: 41px;
}

.ghost__eyes {
  display: flex;

  & .ghost__eye {
    --offset-top: 0px;
    --offset-left: 0px;

    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #272b24;

    &.ghost__eye--left {
      top: var(--offset-top);
      left: var(--offset-left);
      margin-right: 32px;
    }

    &.ghost__eye--right {
      top: var(--offset-top);
      left: var(--offset-left);
    }
  }
}

.ghost__smile {
  margin-top: 6px;
  width: 32px;
  height: 16px;
  margin-left: 20px;
  border-bottom-left-radius: 16px 12px;
  border-bottom-right-radius: 16px 12px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #272b24;
}

.ghost__rosy {
  position: absolute;
  top: 28px;
  width: 22px;
  height: 8px;
  border-radius: 100%;
  background-color: #ffaa9e;

  &.ghost__rosy--left {
    left: -6px;
    transform: rotate(-8deg);
  }

  &.ghost__rosy--right {
    right: -6px;
    transform: rotate(8deg);
  }
}

.ghost__arm {
  position: absolute;
  top: 136px;
  width: 60px;
  height: 40px;
  background-color: #f0efda;

  &.ghost__arm--left {
    left: -4px;
    border-radius: 60% 100%;
    animation: ghost-arms-left var(--animation-mode);
  }

  &.ghost__arm--right {
    right: -65px;
    border-radius: 100% 60%;
    animation: ghost-arms-right var(--animation-mode);
  }
}

@keyframes ghost-arms-left {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(40deg);
  }
}

@keyframes ghost-arms-right {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(-50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(-40deg);
  }
}

.ghost__bottom {
  display: flex;
  position: absolute;
  top: 100%;
  left: 0px;
  right: -1px;

  & > div {
    flex-grow: 1;
    position: relative;
    top: -14px;
    height: 28px;
    border-radius: 100%;
    background-color: #f0efda;

    &:nth-child(2n) {
      top: -10px;
      margin: 0 -2px;
      border-top: 10px solid #f0efda;
      background: transparent;
    }
  }
}

.ghost__shadow {
  margin: 40px 50%;
  width: 200px;
  height: 12px;
  border-radius: 100%;
  background-color: #191d18;
  animation: ghost-shadow var(--animation-mode);
}

@keyframes ghost-shadow {
  0%,
  100% {
    transform: translateX(-50%) scale(1);
  }

  40% {
    transform: translateX(-50%) scale(0.5);
  }
}
</style>
