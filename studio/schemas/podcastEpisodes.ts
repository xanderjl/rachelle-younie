import Parser from 'rss-parser'
import { SchemaTypeDefinition } from 'sanity'
// import { client } from 'studio/sanity.client'

const parser = new Parser()
const rssUrl = process.env.NEXT_PUBLIC_RSS_URL

// const uploadImage = async (imgUrl: string) => {
//   const image = await fetch(imgUrl, { mode: 'no-cors' }).then(res => res.blob())

//   client.assets
//     .upload('image', image)
//     .then(() => {
//       console.log('Done!')
//     })
//     .catch(err => {
//       console.log('err:', err)
//       return { statusCode: 400 }
//     })
//   return image
// }

export const podcastEpisodes: SchemaTypeDefinition = {
  name: 'podcastEpisodes',
  title: 'Podcast Episodes',
  type: 'document',
  // readOnly: true,
  initialValue: async () => {
    const feed = await parser.parseURL(rssUrl)
    // const image = feed?.image && (await uploadImage(feed.image.url))
    // console.log({ image })

    return {
      title: feed?.title,
      // image: image,
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
      initialValue: [{ title: 'title' }],
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
