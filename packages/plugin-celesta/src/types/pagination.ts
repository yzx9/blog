export type Pagination = {
  pages: PaginationData[]
  total: number
}
export type PaginationOptions = {
  currentPage?: number
  pageSize?: number
}

export type PaginationData = {
  path: string
  title: string
  excerpt: string
}

export type PaginationDataSet = PaginationData[]
