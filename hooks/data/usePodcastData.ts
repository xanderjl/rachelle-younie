import { groq } from 'next-sanity'
import type { Image } from 'sanity'
import { client } from 'studio/sanity.client'
import useSWR from 'swr'

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
  image?: Image
  author?: string
  copyright?: string
  description?: string
  episodes?: PodcastEpisode[]
}

export const groqQuery = groq`*[_type == "podcastEpisodes"][0]`

export const getPodcastData = async () => await client.fetch<Podcast>(groqQuery)

export const usePodcastData = () =>
  useSWR<Podcast>('/sanity/podcast', getPodcastData)
