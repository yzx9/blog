import type { DeepReadonly } from "vue"
import type { Categories } from "./categories"
import type { Tags } from "./tags"

interface PaginationRaw {
  pages: PaginationDataSet
  total: number
}

export type Pagination = DeepReadonly<PaginationRaw>

export interface PaginationOptions {
  /**
   * Current page, start form 1
   */
  currentPage?: number

  /**
   * Number of posts per page
   */
  pageSize?: number

  /**
   * Filter posts by slugs of category
   */
  categories?: string | string[]

  /**
   * Filter posts by slugs of tag
   */
  tags?: string | string[]
}

export interface PaginationStorageData {
  key: string
  path: string
  title: string
  excerpt: string
}

type PaginationDataRaw = PaginationStorageData & {
  categories: Categories
  tags: Tags
}

export type PaginationData = DeepReadonly<PaginationDataRaw>

export type PaginationStorageDataSet = PaginationStorageData[]
export type PaginationDataSet = PaginationData[]
