import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'
import type { DescriptiveImage } from 'types/SanityPrimitives'

export interface PoemPage {
  _id: string
  title: string
  slug: string
  scan: DescriptiveImage
  copy: PortableTextBlock[]
}

export const groqQuery = groq`
*[_type == "poem" && $poem == slug.current]{
  _id,
  title,
  "slug": slug.current,
  scan,
  copy
}[0]
`

export const getPoemPage = async (poem: string) =>
  await client.fetch(groqQuery, { poem })

export const useGetPoemPage = (poem: string) =>
  useSWR<PoemPage>('/sanity/poemPage', () => getPoemPage(poem))
