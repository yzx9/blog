<template>
  <div class="navbar" :class="isHideRef ? 'navbar--hide' : ''">
    <ul class="navbar__list">
      <li class="navbar__item"><a href="/">主页</a></li>
      <li class="navbar__item"><a href="/archives">归档</a></li>
      <li class="navbar__item"><a href="/archives">分类</a></li>
      <li class="navbar__item"><a href="/tags">标签</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { usePageScroll, useResolveRouteWithRedirect } from "../composables"

const threshold = 25
const timespan = 500

export default {
  setup(props, ctx) {
    // Auto hide
    const isHideRef = ref(false)
    const pageScroll = usePageScroll()
    const createWather = (top: number) =>
      setTimeout(() => {
        const offset = pageScroll.top - top
        if (offset > threshold) isHideRef.value = true
        else if (offset < -threshold) isHideRef.value = false
      }, timespan)

    watch(pageScroll, () => {
      const top = pageScroll.top
      if (top <= threshold) isHideRef.value = false
      else createWather(top)
    })

    // Active link
    const { currentRoute } = useRouter()
    const active = computed(() => ({
      homepage: currentRoute.value.matched.some((a) => a.path === "/"),
      archives: currentRoute.value.matched.some((a) => a.path === "/archives"),
      categories: currentRoute.value.matched.some(
        (a) => a.path === "/categories"
      ),
      tags: currentRoute.value.matched.some((a) => a.path === "/tags"),
    }))

    // Redirect
    const onRedirect = useResolveRouteWithRedirect

    return {
      onRedirect,
      isHideRef,
      active,
    }
  },
}
</script>
