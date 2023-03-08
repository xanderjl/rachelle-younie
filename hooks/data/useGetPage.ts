import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import type { Image, PortableTextBlock } from 'sanity'
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

export interface Hero {
  title: string
  subtitle?: string
  backgroundImage?: Image
  size: 'sm' | 'md' | 'lg'
}

export interface BaseSection {
  _key: string
  _type:
    | 'sectionContent'
    | 'sectionHero'
    | 'sectionPodcastEpisodes'
    | 'sectionWriting'
}

export interface SectionContent extends BaseSection {
  content: PortableTextBlock
}

export interface SectionWriting extends BaseSection {
  publications?: Publication[]
}

export interface SectionPodcastEpisodes extends BaseSection {
  episodes?: PodcastEpisode[]
}

export type SectionHero = BaseSection & Hero

export type Section =
  | SectionContent
  | SectionWriting
  | SectionPodcastEpisodes
  | SectionHero

export interface Page {
  _id: string
  title: string
  slug: string
  metaDescription?: string
  sections?: Section[]
}

export const groqQuery = groq`
*[_type == "page" && $slug == slug.current]{
  _id,
  title,
  metaDescription,
  "slug": slug.current,
  "sections": sections.sections[]{
    _type,
    _type == "sectionContent" => {
      _key,
      content
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
    },
    _type == "sectionWriting" => {
      _key,
      publications[]->{
        _id,
        description,
        link,
        file,
        publication,
        title
      }
    },
    _type == "sectionHero" => {
      _key,
      title,
      subtitle,
      backgroundImage,
      size
    }
  }
}[0]
`

export const getPage = async (slug: string) =>
  await client.fetch<Page>(groqQuery, { slug })

export const useGetPage = (slug: string) =>
  useQuery({
    queryKey: ['page', slug],
    queryFn: () => getPage(slug),
    staleTime: Infinity,
    cacheTime: Infinity
  })
