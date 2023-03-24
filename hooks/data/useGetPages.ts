import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'

export interface Page {
  slug: string
}

export const groqQuery = groq`
*[_type == "page"]{
  "slug": slug.current
}
`

export const getPages = async () => await client.fetch<Page[]>(groqQuery)

export const useGetPages = () => useSWR<Page[]>('/sanity/pages', getPages)
