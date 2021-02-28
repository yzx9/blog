import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/composables"
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/composables"
import type { ThemeData } from "../types"

export const useThemeData = (): ThemeDataRef<ThemeData> =>
  _useThemeData<ThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<ThemeData> =>
  _useThemeLocaleData<ThemeData>()
