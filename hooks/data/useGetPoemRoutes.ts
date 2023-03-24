import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'

export interface PoemRoute {
  slug: string
  poems: { poem: string }[]
}

export const groqQuery = groq`
*[_type == "page" && sections.sections[]._type match "sectionPoems"]{
  "slug": slug.current,
  "poems": sections.sections[].poems[]->{
    "poem": slug.current
  }
}
`

export const getPoemRoutes = async () =>
  await client.fetch<PoemRoute[]>(groqQuery)

export const useGetPoemRoutes = () =>
  useSWR<PoemRoute[]>('/sanity/poemRoutes', getPoemRoutes)
