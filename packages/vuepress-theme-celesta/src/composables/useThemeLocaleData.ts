import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/composables"
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/composables"
import type { CelestaThemeData } from "../types"

export const useThemeData = (): ThemeDataRef<CelestaThemeData> =>
  _useThemeData<CelestaThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<CelestaThemeData> =>
  _useThemeLocaleData<CelestaThemeData>()
