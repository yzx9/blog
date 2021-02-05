<template>
  <div
    class="navbar"
    :class="{ 'navbar--hide': status.hide, 'navbar--opaque': status.opaque }"
  >
    <ul class="navbar__list">
      <li class="navbar__link" :class="{ 'navbar__link--active': active.blog }">
        <RouterLink to="/">BLOG</RouterLink>
      </li>
    </ul>

    <ul class="navbar__list">
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.archives }"
      >
        <RouterLink to="/archives">ARCHIVES</RouterLink>
      </li>
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.categories }"
      >
        <RouterLink to="/categories">CATEGORIES</RouterLink>
      </li>
      <li class="navbar__link" :class="{ 'navbar__link--active': active.tags }">
        <RouterLink to="/tags">TAGS</RouterLink>
      </li>
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.about }"
      >
        <RouterLink to="/about">ABOUT</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, reactive, watch } from "vue"
import { useRouter } from "vue-router"
import { usePageScroll } from "../composables"

const threshold = 25
const timespan = 500

export default {
  setup(props, ctx) {
    const status = reactive({
      hide: false,
      opaque: false,
    })

    // TODO only support `rem` unit now
    const headerHeight =
      Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height"
        )
      ) * Number.parseInt(getComputedStyle(document.documentElement).fontSize)

    // onMounted(() => {
    let lastTime = Date.now()
    let lastTop = 0

    watch(usePageScroll(), ({ top }) => {
      if (top <= headerHeight) {
        status.opaque = false
        status.hide = false
      } else {
        const now = Date.now()
        status.opaque = true

        if (now - lastTime > timespan) {
          const offset = top - lastTop

          if (offset > threshold) {
            status.hide = true
          } else if (offset < -threshold) {
            status.hide = false
          }

          lastTime = now
          lastTop = top
        }
      }
    })
    // })

    // Active link
    const { currentRoute } = useRouter()
    const active = computed(() => {
      const path = currentRoute.value.path
      return {
        home: path === "/",
        archives: path.startsWith("/archives"),
        categories: path.startsWith("/categories"),
        tags: path.startsWith("/tags"),
        about: path.startsWith("/about"),
      }
    })

    return {
      status,
      active,
    }
  },
}
</script>
