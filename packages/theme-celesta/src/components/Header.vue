<template>
  <div
    class="header h-full flex flex-col justify-center items-center relative overflow-hidden"
  >
    <slot>
      <div class="flex flex-col items-start">
        <div class="z-30 min-w-max">
          <RouterLink
            v-for="{ name, path } in tags"
            :key="`v-page-${path}`"
            :to="path"
            class="header__pill-link"
          >
            {{ name }}
          </RouterLink>
          <a
            v-if="editLink"
            class="header__pill-link"
            :href="editLink.link"
            target="_blank"
            >{{ editLink.text }}</a
          >
        </div>
        <h1 class="my-6 z-30 text-white text-8xl font-medium">
          {{ title }}
        </h1>
      </div>
      <div class="flex z-30">
        <div class="header__meta-item">发表于 {{ date }}</div>
        <div v-if="showUpdate" class="header__meta-item">
          更新于 {{ updated }}
        </div>
      </div>
      <div class="flex z-30">
        <div class="header__meta-item">
          分类于
          <span
            v-for="categories in categoriesArray"
            class="header__categories"
          >
            <RouterLink
              v-for="{ name, path } in categories"
              :key="`v-header-${path}`"
              :to="path"
              class="header__category"
            >
              {{ name }}
            </RouterLink>
          </span>
        </div>
      </div>
    </slot>

    <Particles class="absolute h-full w-full z-0" preset="starry" />
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue"
import { usePageData } from "@vuepress/client"
import Particles from "./Particles.vue"
import {
  useLocaleCategories,
  useLocaleTags,
  useEditLink,
} from "vuepress-plugin-celesta/lib/composables"
import { linkListToArray } from "../utils"
import type { ThemePageData } from "../types"

export default {
  components: {
    Particles,
  },
  setup(props, ctx) {
    const pageData = usePageData<ThemePageData>()

    const { title, date, updated } = toRefs(pageData.value)
    const showUpdate = computed(() => date.value !== updated.value)

    const editLink = useEditLink()

    const categories = useLocaleCategories()
    const categoriesArray = computed(() =>
      categories.value.map(linkListToArray((c) => c.parent))
    )

    const tags = useLocaleTags()

    return {
      title,
      date,
      updated,
      editLink,
      showUpdate,
      categoriesArray,
      tags,
    }
  },
}
</script>

<style lang="postcss">
.header__pill-link {
  @apply mr-2 px-3 py-1 text-white border rounded-full transition-colors duration-300 hover:border-transparent hover:bg-primary-500 hover:bg-opacity-50;
}

.header__meta-item {
  @apply my-2 px-4 z-30 text-gray-500;

  &:not(:last-child) {
    @apply border-r border-gray-600;
  }
}

.header__categories {
  &:not(:last-child) {
    @apply pl-2;

    &::after {
      @apply pl-1 pr-2;
      content: ",";
    }
  }
}

.header__category {
  @apply underline z-30 text-gray-500 transition-colors duration-300 hover:text-primary-500;

  &:not(:last-child) {
    @apply pr-1;

    &::after {
      @apply m-1 border border-b-0 border-l-0 border-gray-500 inline-block;

      --arrow-size: 0.3rem;
      width: var(--arrow-size);
      height: var(--arrow-size);
      content: "";
      transform: rotate(45deg) scaleY(1);
      transform-origin: center;
    }
  }
}
</style>
