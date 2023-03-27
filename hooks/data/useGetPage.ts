import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'
import type { Section } from 'types/SanityPrimitives'

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
    _type == "sectionHero" => {
      _key,
      title,
      subtitle,
      backgroundImage,
      backgroundColor,
      overlay,
      color,
      size,
      textAlign,
      flexDirection,
      justifyContent,
      alignItems
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
    _type == "sectionPoems" => {
      _key,
      "poems": poems[]->{
        _id,
        title,
        "slug": slug.current,
        scan,
        copy
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
    }
  }
}[0]
`

export const getPage = async (slug: string) =>
  await client.fetch<Page>(groqQuery, { slug })

export const useGetPage = (slug: string) =>
  useSWR<Page>('/sanity/page', () => getPage(slug))
