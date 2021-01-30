import { reactive, onMounted, onUnmounted } from "vue"
import { throttle } from "../utils"

const useMouse = () => {
  const mouse = reactive({
    x: 0,
    y: 0,
  })

  const listener = throttle((e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }, 30)

  onMounted(() => document.addEventListener("mousemove", listener))
  onUnmounted(() => document.removeEventListener("mousemove", listener))

  return mouse
}

export { useMouse }
