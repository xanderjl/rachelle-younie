import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

export interface Route {
  title: string
  slug: string
}

export type Navigation = Route[]

export const groqQuery = groq`
*[_type == "navigation" && !(_id in path("drafts.**"))][0].pages[]->{
  title,
  "slug": slug.current
}
`

export const getNavItems = async () => await client.fetch<Navigation>(groqQuery)
export const useNavigation = () =>
  useQuery({
    queryKey: ['navigation'],
    queryFn: getNavItems,
    staleTime: Infinity,
    cacheTime: Infinity
  })
