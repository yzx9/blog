<template>
  <nav class="navbar" :class="isHideRef ? 'navbar--hide' : ''">
    <div class="navbar__item" @click="onRedirect('/')">
      <span>主页</span>
    </div>
    <div class="navbar__item" @click="onRedirect('/archives')">
      <span>归档</span>
    </div>
    <div class="navbar__item" @click="onRedirect('/categories')">
      <span>分类</span>
    </div>
    <div class="navbar__item" @click="onRedirect('/tags')">
      <span>标签</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { reactive, ref, watch } from "vue"
import { usePageScroll } from "../composables"

export default {
  setup(props, ctx) {
    const isHideRef = ref(false)
    watch(usePageScroll(), (val, old) => {
      if (val.top <= 0) isHideRef.value = false
    })

    const onRedirect = (path: string) => {
      // TODO
      console.log(`TODO: navbar redirect to '${path}'`)
    }

    return {
      onRedirect,
      isHideRef,
    }
  },
}
</script>
