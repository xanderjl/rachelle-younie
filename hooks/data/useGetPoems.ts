import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

export interface PoemRoute {
  slug: string
}

export const groqQuery = groq`
*[_type == "poem"]{
  "slug": slug.current
}
`

export const getPoemRoutes = async () =>
  await client.fetch<PoemRoute[]>(groqQuery)

export const useGetPoemRoutes = () =>
  useQuery({ queryKey: ['pages'], queryFn: getPoemRoutes })
