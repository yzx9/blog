<template>
  <div
    class="navbar"
    :class="{
      'navbar--hidden': status.hidden,
      'navbar--opaque': status.opaque,
      'navbar--instant': status.instant,
    }"
  >
    <ul class="navbar__list">
      <li
        class="navbar__link navbar__link--homepage"
        :class="{ 'navbar__link--active': active.blog }"
      >
        <RouterLink to="/">{{ title }}</RouterLink>
      </li>
    </ul>

    <ul class="navbar__list">
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.archives }"
      >
        <RouterLink to="/archives.html">ARCHIVES</RouterLink>
      </li>
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.categories }"
      >
        <RouterLink to="/categories.html">CATEGORIES</RouterLink>
      </li>
      <li class="navbar__link" :class="{ 'navbar__link--active': active.tags }">
        <RouterLink to="/tags.html">TAGS</RouterLink>
      </li>
      <li
        class="navbar__link"
        :class="{ 'navbar__link--active': active.about }"
      >
        <RouterLink to="/about.html">ABOUT</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useSiteLocaleData } from "@vuepress/client"
import { usePageScroll } from "../composables"
import { isSSR } from "../utils"

const threshold = 25
const timespan = 500

export default {
  setup(props, ctx) {
    // title
    const siteLocaleData = useSiteLocaleData()
    const title = ref(siteLocaleData.value.title.toUpperCase())

    // display
    const status = reactive({
      hidden: false,
      opaque: false,
      instant: false,
    })

    // TODO only support `rem` unit now
    const headerHeight = !isSSR()
      ? Number.parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height"
          )
        ) * Number.parseInt(getComputedStyle(document.documentElement).fontSize)
      : 0

    let lastTime = Date.now()
    let lastTop = 0

    watch(usePageScroll(), ({ top }) => {
      const now = Date.now()

      if (top <= headerHeight) {
        status.opaque = false
        status.hidden = false
        status.instant = true
        lastTime = now
      } else if (lastTop <= headerHeight) {
        status.opaque = true
        status.hidden = true
        status.instant = true
        lastTime = now
      } else {
        status.opaque = true

        if (now - lastTime > timespan) {
          const offset = top - lastTop
          status.instant = false

          if (offset > threshold) {
            status.hidden = true
          } else if (offset < -threshold) {
            status.hidden = false
          }

          lastTime = now
        }
      }

      lastTop = top
    })

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
      title,
      status,
      active,
    }
  },
}
</script>
