import { useState } from 'react'

/**
 * @param arr
 * Array of data you wish to paginate.
 *
 * @param pageSize
 * How many items should be returned for a given page.
 */
export type Pagination = <T>(
  arr: T[] | undefined,
  pageSize: number
) => PaginationReturnType<T>

/**
 * @param array
 * The returned array, sliced based on the index of   `currentPage`.
 *
 * @param currentPage
 * The index of the current page in `arr`.
 *
 * @param numPages
 * The maximum number of pages based on the length of `arr` divisible by `pageSize`.
 */
export interface PaginationReturnType<T> {
  next: () => void
  prev: () => void
  jump: (page: number) => void
  currentData: T[]
  currentPage: number
  numPages: number
}

export const usePagination: Pagination = (arr = [], pageSize) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const numPages = Math.ceil(arr.length / pageSize)

  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const currentData = arr.slice(start, end)

  const next = () =>
    setCurrentPage(currentPage => Math.min(currentPage + 1, numPages))

  const prev = () => setCurrentPage(currentPage => Math.max(currentPage - 1, 1))

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page)

    setCurrentPage(() => Math.min(pageNumber, numPages))
  }

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    numPages
  }
}
