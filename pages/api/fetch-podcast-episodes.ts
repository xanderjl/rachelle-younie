import { randomUUID } from 'crypto'
import type { NextApiHandler } from 'next'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from 'studio/sanity.client'
import { fetchPodcastData } from 'utils/fetchPodcastData'

const fetchPodcastEpisodes: NextApiHandler = async (_, res) => {
  try {
    const client = createClient({
      apiVersion,
      dataset,
      projectId,
      token: process.env.NEXT_SANITY_API_TOKEN
    })
    const { author, description, items, title } = await fetchPodcastData()

    const episodes = items?.map(item => {
      const {
        content,
        contentSnippet,
        creator,
        enclosure,
        guid,
        isoDate,
        link,
        pubDate,
        summary,
        title
      } = item

      const _key = randomUUID()

      return {
        _key,
        content,
        contentSnippet,
        creator,
        enclosure,
        guid,
        isoDate,
        link,
        pubDate,
        summary,
        title
      }
    })

    const data = {
      author,
      description,
      title,
      episodes
    }

    await client.patch('podcastEpisodes').set(data).commit()

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default fetchPodcastEpisodes
