import type { ThemePageTags } from "src/node"

/**
 * Get pages by tag
 */
export type TagToPagesMap = Record<string, string[]>

/**
 * Get tags by page
 */
export type PageToTagsMap = Record<string, ThemePageTags>
