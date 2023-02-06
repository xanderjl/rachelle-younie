export type PaginateArray = <T>(
  arr: T[],
  currentPage: number,
  pageSize: number
) => {
  array: T[]
  currentPage: number
  numPages: number
}

export const paginateArray: PaginateArray = (arr, currentPage, pageSize) => {
  const numPages = Math.floor(arr.length / pageSize)
  const arrIndex = currentPage * pageSize

  const start = arrIndex
  const end = arrIndex + pageSize
  const array = arr.slice(start, end)

  return {
    array,
    currentPage,
    numPages
  }
}
