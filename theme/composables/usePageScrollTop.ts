import { onMounted, onUnmounted, reactive } from "vue"
import { throttle } from "../utils"

const getScrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop || 0

const getScrollLeft = () =>
  document.documentElement.scrollLeft || document.body.scrollLeft || 0

export const usePageScroll = (options = { allowTrottle: true }) => {
  const position = reactive({
    top: getScrollTop(),
    left: getScrollLeft(),
  })

  const raw = function (this: any, e: Event) {
    position.top = getScrollTop()
    position.left = getScrollLeft()
  }

  const listener = options.allowTrottle ? throttle(raw, 30) : raw

  onMounted(() => document.addEventListener("scroll", listener))
  onUnmounted(() => document.removeEventListener("scroll", listener))

  return position
}
