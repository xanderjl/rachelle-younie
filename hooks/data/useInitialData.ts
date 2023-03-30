import { groq } from 'next-sanity'
import type { Image } from 'sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'
import type { Social } from 'types/SanityPrimitives'

import type { Navigation } from './useNavigation'

export interface InitialData {
  siteTitle?: string
  metaDescription?: string
  favicon?: Image
  navigation?: Navigation
  socials?: Social[]
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
  },
  "socials": *[_type == "social"]{
    _id,
    title,
    url,
    icon
  }
}[0]
`

export const getInitialData = async () =>
  await client.fetch<InitialData>(groqQuery).then(data => {
    return {
      ...data,
      navigation: [
        ...(data.navigation || []),
        { title: 'contact', slug: 'contact' }
      ]
    }
  })

export const useInitialData = () => useSWR<InitialData>('/sanity/initialData')
