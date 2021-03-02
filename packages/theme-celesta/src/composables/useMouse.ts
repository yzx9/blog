import { reactive, onMounted, onUnmounted } from "vue"
import { debounce } from "ts-debounce"

type MouseOption = {
  /**
   * debounce delay
   *
   * @default 33
   */
  delay?: number

  /**
   * debounce max wait
   *
   * set true to use delay
   *
   * set false to disable it
   *
   * @default true
   */
  maxWait?: boolean | number
}

export const useMouse = (
  options: MouseOption = { delay: 33, maxWait: true }
) => {
  const { delay = 33, maxWait = true } = options

  const mouse = reactive({
    x: 0,
    y: 0,
  })

  const mouseEventHandle = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  const option =
    maxWait !== false ? { maxWait: maxWait === true ? delay : maxWait } : {}

  const onMouseMove = debounce(mouseEventHandle, delay, option)

  onMounted(() => {
    document.addEventListener("mousemove", onMouseMove)
  })

  onUnmounted(() => {
    document.removeEventListener("mousemove", onMouseMove)
  })

  return mouse
}
