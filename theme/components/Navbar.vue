<template>
  <nav class="navbar" :class="isHideRef ? 'navbar--hide' : ''">
    <ul class="navbar__list">
      <li class="navbar__item" @click="onRedirect('/')">
        <span>主页</span>
      </li>
      <li class="navbar__item" @click="onRedirect('/archives')">
        <span>归档</span>
      </li>
      <li class="navbar__item" @click="onRedirect('/categories')">
        <span>分类</span>
      </li>
      <li class="navbar__item" @click="onRedirect('/tags')">
        <span>标签</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, watch } from "vue"
import { usePageScroll, useResolveRouteWithRedirect } from "../composables"

const threshold = 25
const timespan = 500

export default {
  setup(props, ctx) {
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

    const onRedirect = useResolveRouteWithRedirect

    return {
      onRedirect,
      isHideRef,
    }
  },
}
</script>
