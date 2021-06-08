<template>
  <div class="navbar" :class="{ 'navbar_transparent': isTransparent }">
    <ul class="flex">
      <li class="navbar__link">
        <RouterLink to="/" class="font-bold">{{ title }}</RouterLink>
      </li>
    </ul>

    <ul class="flex">
      <li
        v-for="{ name, link, active } in links"
        :key="`v-navbar-link-${link}`"
        class="navbar__link"
        :class="{ 'text-primary-500': active }"
      >
        <RouterLink :to="link">{{ name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useSiteLocaleData } from "@vuepress/client"
import { useRouter } from "vue-router"
import { useScroll } from "../composables"

// links
const { currentRoute } = useRouter()
const links = computed(() => [
  {
    name: "ARCHIVES",
    link: "/archives.html",
    active: currentRoute.value.path.startsWith("/archives"),
  },
  {
    name: "CATEGORIES",
    link: "/categories.html",
    active: currentRoute.value.path.startsWith("/categories"),
  },
  {
    name: "TAGS",
    link: "/tags.html",
    active: currentRoute.value.path.startsWith("/tags")
  },
  {
    name: "ABOUT",
    link: "/about.html",
    active: currentRoute.value.path.startsWith("/about"),
  },
])

// title
const siteLocaleData = useSiteLocaleData()
const isHomepage = computed(() => currentRoute.value.path === "/")
const title = computed(() =>
  isHomepage.value ? "BLOG" : siteLocaleData.value.title.toUpperCase()
)

// display
const NAVBAR_HEIGHT = 50
const THRESHOLD = NAVBAR_HEIGHT * 3

const { top: scrollTop } = useScroll()
const isTransparent = computed(() => scrollTop.value <= THRESHOLD)

const top = ref(0)
const createBetween = (min: number, max: number) => (val: number) => val < min ? min : val > max ? max : val
const between = createBetween(-NAVBAR_HEIGHT, 0)
watch(scrollTop, (value, oldValue) => {
  top.value = between(top.value + oldValue - value)
})
</script>

<style lang="postcss">
.navbar {
  @apply fixed top-0 left-0 w-full flex justify-between;
  @apply z-50 bg-white bg-opacity-70 shadow-md transition-all duration-500;

  --navbar-height: calc(v-bind(NAVBAR_HEIGHT) * 1px);

  height: var(--navbar-height);
  top: calc(v-bind(top) * 1px);
}

.navbar_transparent {
  @apply bg-opacity-0 shadow-none;

  & .navbar__link {
    @apply text-white;

    &:hover a {
      @apply border-primary-500;
    }
  }
}

.navbar__link {
  @apply flex justify-center items-center transition-all;
  @apply font-medium text-primary-500;

  & a {
    @apply h-full px-4 align-middle transition-all;
    border-bottom: 2px solid transparent;
    line-height: var(--navbar-height);
  }
}
</style>
