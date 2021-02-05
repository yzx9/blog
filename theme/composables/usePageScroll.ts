import { onMounted, onUnmounted, reactive } from "vue"
import { throttle, isSSR } from "../utils"

const getScrollTop = () =>
  (!isSSR() && document.documentElement.scrollTop) ||
  (!isSSR() && document.body.scrollTop) ||
  0

const getScrollLeft = () =>
  (!isSSR() && document.documentElement.scrollTop) ||
  (!isSSR() && document.body.scrollTop) ||
  0

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
