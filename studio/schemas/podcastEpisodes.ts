import Parser from 'rss-parser'
import type { SchemaTypeDefinition } from 'sanity'

const parser = new Parser()
const rssUrl = process.env.NEXT_PUBLIC_RSS_URL

export const podcastEpisodes: SchemaTypeDefinition = {
  name: 'podcastEpisodes',
  title: 'Podcast Episodes',
  type: 'document',
  // readOnly: true,
  initialValue: async () => {
    const feed = await parser.parseURL(rssUrl)

    return {
      title: feed?.title,
      author: feed?.author,
      copyright: feed?.copyright,
      description: feed?.description,
      episodes: feed?.items.map(
        ({
          content,
          contentSnippet,
          creator,
          guid,
          isoDate,
          link,
          pubDate,
          enclosure,
          title
        }) => {
          return {
            content,
            contentSnippet,
            creator,
            guid,
            isoDate,
            link,
            pubDate,
            enclosure,
            title
          }
        }
      )
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'copyright',
      title: 'Copyright',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [{ type: 'episode' }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Podcast Episodes'
      }
    }
  }
}
