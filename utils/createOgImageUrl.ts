import baseUrl from './baseUrl'

export const createOgImageUrl = (title: string, subtitle: string): URL => {
  const apiRoute = '/api/dynamic-og-image'
  const url = new URL(`${baseUrl}${apiRoute}`)

  url.searchParams.append('title', title)
  url.searchParams.append('subtitle', subtitle)

  return url
}

export const createPoemOgImageUrl = (poem: string): URL => {
  const apiRoute = '/api/poem-og-image'
  const url = new URL(`${baseUrl}${apiRoute}`)

  url.searchParams.append('poem', poem)

  return url
}
