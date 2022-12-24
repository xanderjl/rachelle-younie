import { useQuery } from '@tanstack/react-query'
import { groq } from 'next-sanity'
import { ImageAsset } from 'sanity'
import { client } from 'studio/sanity.client'

export interface PodcastEpisode {
  title?: string
  content?: string
  contentSnippet?: string
  creator?: string
  enclosure?: {
    url?: string
    length?: string
    type?: string
  }
  guid?: string
  link?: string
  pubDate?: string
  isoDate?: string
}

export interface Podcast {
  title?: string
  image?: ImageAsset
  author?: string
  copyright?: string
  description?: string
  episodes?: PodcastEpisode[]
}

export const groqQuery = groq`*[_type == "podcastEpisodes"][0]`

export const getPodcastData = async () => {
  const data = await client.fetch<Podcast>(groqQuery)

  return data
}

export const usePodcastData = () =>
  useQuery({ queryKey: ['podcast-data'], queryFn: getPodcastData })
