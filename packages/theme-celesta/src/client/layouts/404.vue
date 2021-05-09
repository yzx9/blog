<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="flex justify-center items-center m-20 pb-64">
      <Ghost />
      <div class="not-found__info flex flex-col items-start">
        <span class="text-8xl text-primary-500">404</span>
        <blockquote class="text-gray-400 border-l-4 my-4 p-1 pl-4">
          {{ message }}
        </blockquote>

        <RouterLink to="/" class="text-primary-500 font-bold hover:underline">
          {{ backToHome }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client"
import Ghost from "../components/Ghost.vue"
import type { ThemeData } from "../types"

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export default {
  components: {
    Ghost,
  },
  setup(props, ctx) {
    const themeLocale = useThemeLocaleData<ThemeData>()
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

<style lang="postcss">
.not-found__info {
  min-width: 30rem;
}
</style>
