export const paginateArray = <T>(
  arr: T[],
  currentPage: number,
  pageSize: number
): {
  array: T[]
  currentPage: number
  numPages: number
} => {
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
