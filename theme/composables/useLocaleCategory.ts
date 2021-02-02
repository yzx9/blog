import { useThemeData, useThemeLocaleData } from "@vuepress/client"
import { normalizeCategory } from "../utils"
import type { ThemeOptions, ThemeLocaleOptions } from "../types"

export const useLocaleCategory = (raw: string) => {
  const localeData = useThemeLocaleData<ThemeLocaleOptions>()
  const data = useThemeData<ThemeOptions>()
  const category = normalizeCategory(raw)
  const name =
    localeData.value?.categories?.[category] ??
    data.value?.categories?.[category] ??
    raw

  return name
}
