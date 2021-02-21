<template>
  <div
    class="navbar"
    :class="{
      'navbar--hidden': status.hidden,
      'navbar--opaque': status.opaque,
      'navbar--instant': status.instant,
    }"
  >
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

<script lang="ts">
import { computed, onMounted, reactive, watch } from "vue"
import { useRouter } from "vue-router"
import { useSiteLocaleData } from "@vuepress/client"
import { useScroll } from "../composables"

const threshold = 25
const timespan = 500

export default {
  setup(props, ctx) {
    // links
    const { currentRoute } = useRouter()
    const isHomepage = currentRoute.value.path === "/"

    const links = computed(() => {
      const { path } = currentRoute.value
      return [
        {
          name: "ARCHIVES",
          link: "/archives.html",
          active: path.startsWith("/archives"),
        },
        {
          name: "CATEGORIES",
          link: "/categories.html",
          active: path.startsWith("/categories"),
        },
        { name: "TAGS", link: "/tags.html", active: path.startsWith("/tags") },
        {
          name: "ABOUT",
          link: "/about.html",
          active: path.startsWith("/about"),
        },
      ]
    })

    // title
    const siteLocaleData = useSiteLocaleData()
    const title = computed(() =>
      isHomepage ? "BLOG" : siteLocaleData.value.title.toUpperCase()
    )

    // display
    const status = reactive({
      hidden: false,
      opaque: false,
      instant: false,
    })

    const scroll = useScroll()
    onMounted(() => {
      // TODO only support `rem` unit now
      const documentStyle = getComputedStyle(document.documentElement)
      const headerHeight =
        Number.parseInt(documentStyle.getPropertyValue("--header-height")) *
        Number.parseInt(documentStyle.fontSize)

      let lastTime = Date.now()
      let lastTop = 0

      watch(scroll, ({ top }) => {
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
    })

    return {
      links,
      title,
      status,
    }
  },
}
</script>

<style lang="postcss">
.navbar {
  @apply fixed top-0 w-full flex justify-between transition-all duration-500;

  --navbar-height: 3rem;
  height: var(--navbar-height);

  & .navbar__link {
    @apply flex justify-center items-center transition-all font-medium text-white hover:text-primary-500;

    & a {
      @apply h-full px-4 align-middle transition-all;
      border-bottom: 2px solid transparent;
      line-height: var(--navbar-height);
    }
  }
}

.navbar--opaque {
  @apply shadow-md bg-opacity-50;
  background-color: rgba(var(--bg-color), var(--tw-bg-opacity));

  & .navbar__link {
    @apply text-primary-500;

    &:hover a {
      @apply border-primary-500;
    }
  }
}

.navbar--hidden {
  @apply shadow-none;
  top: calc(0 - var(--navbar-height));
}

.navbar--instant {
  @apply transition-none;
}
</style>
