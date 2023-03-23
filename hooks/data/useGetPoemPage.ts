import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { client } from 'studio/sanity.client'

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
  useQuery({
    queryKey: ['poem', poem],
    queryFn: () => getPoemPage(poem),
    staleTime: Infinity,
    cacheTime: Infinity
  })
