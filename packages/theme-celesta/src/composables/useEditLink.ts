import { usePageData, usePageFrontmatter } from "@vuepress/client"
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/composables"
import { computed } from "vue"
import { resolveEditLink } from "../utils"
import type { ThemeData, ThemePageData } from "../types"

export const useEditLink = () => {
  const themeLocale = useThemeLocaleData<ThemeData>()
  const page = usePageData<ThemePageData>()
  const frontmatter = usePageFrontmatter()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true

    if (!showEditLink || !page.value.filePathRelative) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = "main",
      docsDir = "",
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? "Edit this page",
      link: editLink,
    }
  })
}
