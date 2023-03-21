// https://github.com/lorenzodejong/next-sanity-image/blob/805ce64381b484103c6bfba13c363bbd1d436340/src/useNextSanityImage.ts#L53-L60

export type ComputeDimensions = (src: string) => {
  width: number
  height: number
  ratio: number
}

export const computeDimensions: ComputeDimensions = src => {
  const dims = src?.split('-')[1]
  const [width, height] = dims
    .split('x')
    .map((num: string) => parseInt(num, 10))
  const ratio = width / height

  return { width, height, ratio }
}
