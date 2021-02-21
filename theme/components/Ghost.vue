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

<style lang="postcss">
.ghost {
  width: 10rem;
  height: 12.5rem;
  margin: 3rem 5rem;

  --animation-mode: 6s ease infinite;
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

.ghost__eye {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #272b24;

  &.ghost__eye--left {
    margin-right: 32px;
  }
}

.ghost__smile {
  margin-top: 26px;
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
