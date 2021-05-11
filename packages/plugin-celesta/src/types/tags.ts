import type { ThemePageTags } from "./pageTags"

/**
 * Get pages by tag
 */
export type TagToPagesMap = Record<string, string[]>

/**
 * Get tags by page
 */
export type PageToTagsMap = Record<string, ThemePageTags>
