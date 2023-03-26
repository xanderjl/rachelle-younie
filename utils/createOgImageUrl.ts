export const createOgImageUrl = (title: string, subtitle: string): URL => {
  const apiRoute = '/api/dynamic-og-image'
  const baseUrl = new URL(
    `${process.env.NEXT_PUBLIC_URL}${apiRoute}` ??
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${apiRoute}`
  )

  baseUrl.searchParams.append('title', title)
  baseUrl.searchParams.append('subtitle', subtitle)

  return baseUrl
}
