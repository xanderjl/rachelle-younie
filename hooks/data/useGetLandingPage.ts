import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

import { Section } from './useGetPage'

export interface LandingPage {
  title: string
  metaDescription?: string
  sections?: Section[]
}

export const groqQuery = groq`
*[_type == "page" && _id == "homePage"]{
  title,
  metaDescription,
  "sections": sections.sections[]{
    _type,
    _type == "sectionContent" => {
      _key,
      content
    },
    _type == "sectionWriting" => {
      _key,
      publications[]->{
        _id,
        description,
        link,
        file,
        publication{
          title,
          url
        },
        title
      }
    },
    _type == "sectionPodcastEpisodes" => {
      _key,
      "episodes": episodes->.episodes[]{
        _key,
        content,
        creator,
        enclosure,
        guid,
        isoDate,
        title
      }
    }
  }
}[0]
`

export const getLandingPageData = async () =>
  await client.fetch<LandingPage>(groqQuery)

export const useGetLandingPage = () =>
  useQuery({
    queryKey: ['landing-page'],
    queryFn: getLandingPageData,
    staleTime: Infinity,
    cacheTime: Infinity
  })
