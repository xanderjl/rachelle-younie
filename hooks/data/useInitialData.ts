import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { ImageAsset } from 'sanity'
import { client } from 'studio/sanity.client'

import type { Navigation } from './useNavigation'

export interface InitialData {
  siteTitle?: string
  metaDescription?: string
  favicon?: ImageAsset
  navigation?: Navigation
}

export const groqQuery = groq`
*[_type == "settings"]{
  siteTitle,
  metaDescription,
  favicon,
  "navigation": *[_type == "navigation" && !(_id in path("drafts.**"))][0].pages[]{
    _type == "customNavItem" => {
      title,
      "slug": slug.current
    },
    _type == "reference" => @->{
      title,
      "slug": slug.current
  }
}
}[0]
`

export const getInitialData = async () =>
  await client.fetch<InitialData>(groqQuery)

export const useInitialData = () =>
  useQuery({
    queryKey: ['initial-data'],
    queryFn: getInitialData,
    staleTime: Infinity,
    cacheTime: Infinity
  })
