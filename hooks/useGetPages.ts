import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

export interface Page {
  slug: string
}

export const groqQuery = groq`
*[_type == "page"]{
  "slug": slug.current
}
`

export const getPages = async () => await client.fetch<Page[]>(groqQuery)

export const useGetPages = () =>
  useQuery({ queryKey: ['pages'], queryFn: getPages })
