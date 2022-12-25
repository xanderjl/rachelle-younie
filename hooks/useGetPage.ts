import { PortableTextProps } from '@portabletext/react'
import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

export interface Publication {
  _id: string
  description?: string
  link?: string
  file?: string
  publication?: {
    title?: string
    url?: string
  }
  title?: string
}

export interface PodcastEpisode {
  _key: string
  content?: string
  creator?: string
  enclosure?: {
    length?: string
    type?: string
    url?: string
  }
  guid?: string
  isoDate?: string
  title?: string
}

export interface SectionContent {
  _key: string
  content: PortableTextProps
}

export interface SectionWriting {
  _key: string
  publications?: Publication[]
}

export interface SectionPodcastEpisodes {
  episodes?: PodcastEpisode[]
}

export type Section = SectionContent | SectionWriting | SectionPodcastEpisodes

export interface Page {
  _id: string
  title: string
  slug: string
  sections?: Section[]
}

export const groqQuery = groq`
*[_type == "page" && $slug == slug.current]{
  _id,
  title,
  "slug": slug.current,
  "sections": sections.sections[]{
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

export const getPage = async (slug: string) =>
  await client.fetch<Page>(groqQuery, { slug })

export const useGetPage = (slug: string) =>
  useQuery({ queryKey: ['page', slug], queryFn: () => getPage(slug) })
