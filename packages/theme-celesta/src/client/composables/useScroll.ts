import { onMounted, onUnmounted, reactive, ref } from "vue"
import { debounce } from "ts-debounce"

/**
 * Client Only
 */
export const getScrollTop = () =>
  Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  )

/**
 * Client Only
 */
export const getScrollBottom = () =>
  document.body.clientHeight - window.innerHeight - getScrollTop()

/**
 * Client Only
 */
export const getScrollLeft = () =>
  Math.max(
    window.pageXOffset,
    document.documentElement.scrollLeft,
    document.body.scrollLeft
  )

/**
 * Client Only
 */
export const getScrollRight = () => document.body.clientWidth - getScrollLeft()

export const useScroll = (options = { delay: 0 }) => {
  const top = ref(0)
  const bottom = ref(0)
  const left = ref(0)
  const right = ref(0)

  const onScroll = debounce(function (this: any, e?: Event) {
    top.value = getScrollTop()
    bottom.value = getScrollBottom()
    left.value = getScrollLeft()
    right.value = getScrollRight()
  }, options.delay)

  onMounted(() => {
    onScroll()
    document.addEventListener("scroll", onScroll)
  })

  onUnmounted(() => {
    document.removeEventListener("scroll", onScroll)
  })

  return { top, bottom, left, right }
}
