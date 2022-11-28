import { SchemaTypeDefinition } from 'sanity'

export const podcastEpisodes: SchemaTypeDefinition = {
  name: 'podcastEpisodes',
  title: 'Podcast Episodes',
  type: 'document',
  fields: [
    {
      name: 'test',
      title: 'test',
      type: 'string'
    }
  ]
}
