<template>
  <div ref="ghost" class="ghost">
    <div class="body">
      <div class="face">
        <div class="eye left" :style="eyes.left" />
        <div class="eye right" :style="eyes.right" />
        <div class="smile" />
        <div class="rosy left" />
        <div class="rosy right" />
      </div>
      <div class="arm left" />
      <div class="arm right" />
      <div class="bottom">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
    <div class="shadow" />
  </div>
</template>

<script>
// 偏移半径
const R = 1

// 声明左眼圆心(X1,Y1)、右眼圆心(X2,Y2)
const X1 = 13
const Y1 = 11
const X2 = 61
const Y2 = 11

function throttle(fn, interval) {
  let last = 0

  return function() {
    const context = this
    const args = arguments
    const now = Date.now()

    if (now - last >= interval) {
      last = now
      fn.apply(context, args)
    }
  }
}

export default {
  computed: {
    angle() {
      return {
        left: Math.atan2(
          this.x - X1 - this.offsetLeft,
          this.y - Y1 - this.offsetTop
        ),
        right: Math.atan2(
          this.x - X2 - this.offsetLeft,
          this.y - Y2 - this.offsetTop
        )
      }
    },
    eyes() {
      const left1 = R * Math.sin(this.angle.left) + X1 - 10
      const top1 = R * Math.cos(this.angle.left) + Y1 - 10

      const left2 = R * Math.sin(this.angle.right) + X2 - 10
      const top2 = R * Math.cos(this.angle.right) + Y2 - 10

      return {
        left: {
          left: `${left1}px`,
          top: `${top1}px`
        },
        right: {
          left: `${left2}px`,
          top: `${top2}px`
        }
      }
    }
  },
  data() {
    return {
      offsetLeft: 0,
      offsetTop: 0,
      x: 0,
      y: 0
    }
  },
  mounted() {
    // 脑袋的偏移
    this.offsetLeft = this.$refs.ghost.offsetLeft
    this.offsetTop = this.$refs.ghost.offsetTop

    document.onmousemove = throttle(e => {
      this.x = e.clientX
      this.y = e.clientY
    }, 30)
  }
}
</script>

<style lang="stylus" scoped>
.ghost {
  width: 160px;
  height: 200px;
  margin: 50px 100px;

  .body {
    position: relative;
    width: 160px;
    height: 200px;
    border-top-right-radius: 80px;
    border-top-left-radius: 80px;
    background-color: #f0efda;
    animation: float 10s ease infinite;

    .face {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      top: 67px;
      left: 37px;
      width: 72px;
      height: 41px;

      .eye {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: #272b24;

        &.left {
          margin-right: 32px;
        }
      }

      .smile {
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

      .rosy {
        position: absolute;
        top: 28px;
        width: 22px;
        height: 8px;
        border-radius: 100%;
        background-color: #ffaa9e;

        &.left {
          left: -6px;
          transform: rotate(-8deg);
        }

        &.right {
          right: -6px;
          transform: rotate(8deg);
        }
      }
    }

    .arm {
      position: absolute;
      top: 136px;
      width: 60px;
      height: 40px;
      background-color: #f0efda;

      &.left {
        left: -4px;
        border-radius: 60% 100%;
        animation: arms-left 10s ease infinite;
      }

      &.right {
        right: -65px;
        border-radius: 100% 60%;
        animation: arms-right 10s ease infinite;
      }
    }

    .bottom {
      display: flex;
      position: absolute;
      top: 100%;
      left: 0px;
      right: -1px;

      div {
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
  }

  .shadow {
    margin: 40px 50%;
    width: 200px;
    height: 12px;
    border-radius: 100%;
    background-color: #191d18;
    animation: shadow 10s ease infinite;
  }
}

@keyframes float {
  0%, 100% {
    top: 0px;
  }

  40% {
    top: -40px;
  }
}

@keyframes float {
  0%, 100% {
    top: 0px;
  }

  40% {
    top: -40px;
  }
}

@keyframes arms-left {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(40deg);
  }
}

@keyframes arms-left {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(40deg);
  }
}

@keyframes arms-right {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(-50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(-40deg);
  }
}

@keyframes arms-right {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(-50deg);
  }

  40% {
    transform: translate(-50%, -50%) rotate(-40deg);
  }
}

@keyframes shadow {
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }

  40% {
    transform: translateX(-50%) scale(0.5);
  }
}

@keyframes shadow {
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }

  40% {
    transform: translateX(-50%) scale(0.5);
  }
}
</style>