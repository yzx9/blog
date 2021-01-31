import { reactive, onMounted, onUnmounted } from "vue"
import { throttle } from "../utils"

const useMouse = (options = { allowTrottle: true }) => {
  const mouse = reactive({
    x: 0,
    y: 0,
  })

  const raw = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const listener = options.allowTrottle ? throttle(raw, 32) : raw

  onMounted(() => document.addEventListener("mousemove", listener))
  onUnmounted(() => document.removeEventListener("mousemove", listener))

  return mouse
}

export { useMouse }
