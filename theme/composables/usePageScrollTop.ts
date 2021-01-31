import { onMounted, onUnmounted, reactive } from "vue"
import { throttle } from "../utils"

const getScrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop || 0

const getScrollLeft = () =>
  document.documentElement.scrollLeft || document.body.scrollLeft || 0

export const usePageScroll = () => {
  const position = reactive({
    top: getScrollTop(),
    left: getScrollLeft(),
  })

  const listener = throttle(function (this: any, e: Event) {
    position.top = getScrollTop()
    position.left = getScrollLeft()
  }, 30)

  onMounted(() => document.addEventListener("scroll", listener))
  onUnmounted(() => document.removeEventListener("scroll", listener))

  return position
}
