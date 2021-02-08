import { reactive, onMounted, onUnmounted } from "vue"
import { debounce } from "ts-debounce"

const useMouse = (options = { delay: 33 }) => {
  const mouse = reactive({
    x: 0,
    y: 0,
  })

  const onMouseMove = debounce((e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }, options.delay)

  onMounted(() => {
    document.addEventListener("mousemove", onMouseMove)
  })

  onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove)
  })

  return mouse
}

export { useMouse }
