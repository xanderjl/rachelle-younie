import baseUrl from './baseUrl'

export const createOgImageUrl = (
  title: string,
  subtitle: string,
  slug: string,
  token: string
): URL => {
  const apiRoute = '/api/dynamic-og-image'
  const url = new URL(`${baseUrl}${apiRoute}`)

  url.searchParams.append('title', title)
  url.searchParams.append('subtitle', subtitle)
  url.searchParams.append('slug', slug)
  url.searchParams.append('token', token)

  return url
}

export const createPoemOgImageUrl = (poem: string, token: string): URL => {
  const apiRoute = '/api/poem-og-image'
  const url = new URL(`${baseUrl}${apiRoute}`)

  url.searchParams.append('poem', poem)
  url.searchParams.append('token', token)

  return url
}
