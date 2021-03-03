import { computed } from "vue"
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/composables"
import { resolveRepoType } from "../utils"
import type { ThemeData } from "../types"

export const useRepo = () => {
  const themeLocale = useThemeLocaleData<ThemeData>()
  const repo = computed(() => themeLocale.value.repo)
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  )

  const repoLink = computed(() => {
    if (repoType.value === "GitHub") {
      return `https://github.com/${repo.value}`
    }
    return repo.value
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) {
      return null
    } else if (themeLocale.value.repoLabel) {
      return themeLocale.value.repoLabel
    } else if (repoType.value === null) {
      return "Source"
    } else {
      return repoType.value
    }
  })

  return computed(() => {
    if (repoLink.value && repoLabel.value) {
      return [
        {
          text: repoLabel.value,
          link: repoLink.value,
        },
      ]
    } else {
      return []
    }
  })
}
