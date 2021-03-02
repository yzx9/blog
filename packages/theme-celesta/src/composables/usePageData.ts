import { usePageData as _usePageData } from "@vuepress/client"
import type { ThemePageData } from "../types"

export const usePageData = () => _usePageData<ThemePageData>()
