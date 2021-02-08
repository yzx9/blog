import { onMounted, onUnmounted, reactive } from "vue"
import { debounce } from "ts-debounce"
import { isSSR } from "../utils"

export const getScrollTop = () =>
  Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  )

export const getScrollLeft = () =>
  Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  )

export const usePageScroll = (options = { delay: 33 }) => {
  if (isSSR()) return reactive({ top: 0, left: 0 })

  const position = reactive({
    top: getScrollTop(),
    left: getScrollLeft(),
  })

  const onScroll = debounce(function (this: any, e?: Event) {
    position.top = getScrollTop()
    position.left = getScrollLeft()
  }, options.delay)

  onMounted(() => {
    onScroll()
    document.addEventListener("scroll", onScroll)
  })

  onUnmounted(() => {
    onScroll.cancel()
    document.removeEventListener("scroll", onScroll)
  })

  return position
}
