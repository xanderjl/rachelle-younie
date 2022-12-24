import { useQuery } from '@tanstack/react-query'
import Parser from 'rss-parser'

export const fetchPodcastData = async () => {
  const parser = new Parser()
  const rssUrl = process.env.NEXT_PUBLIC_RSS_URL
  const feed = await parser.parseURL(rssUrl)

  return feed
}

export const usePodcastData = () => {
  return useQuery({
    queryKey: ['podcast-data'],
    queryFn: fetchPodcastData
  })
}
