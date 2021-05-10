import { writeTranslations } from "./writeTranslations"
import type { App } from "@vuepress/core"
import type { ThemeData } from "@vuepress/plugin-theme-data"

export const createPreparedHook = (options: ThemeData) => async (app: App) => {
  const promises = [writeTranslations(options, app)]
  await Promise.all(promises)
}
