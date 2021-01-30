<template>
  <div class="not-found">
    <div class="not-found__content">
      <Ghost />
      <div class="not-found__info">
        <span class="not-found__title">404</span>
        <blockquote class="not-found__message">{{ message }}</blockquote>

        <RouterLink to="/" class="not-found__back-to-home">
          {{ backToHome }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useThemeData } from "@vuepress/client"
import Ghost from "../components/Ghost.vue"

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export default {
  components: {
    Ghost,
  },
  setup(props, ctx) {
    const themeLocale = useThemeData()
    const messages = themeLocale.value.notFound ?? ["Not Found"]
    const backToHomes = themeLocale.value.backToHome ?? ["Back To Home"]

    const message = rand(messages)
    const backToHome = rand(backToHomes)

    return {
      message,
      backToHome,
    }
  },
}
</script>
