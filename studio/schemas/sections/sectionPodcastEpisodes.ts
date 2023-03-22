import { FaMicrophoneAlt } from 'react-icons/fa'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionPodcastEpisodes: SchemaTypeDefinition = {
  name: 'sectionPodcastEpisodes',
  title: 'Podcast Episodes Section',
  type: 'object',
  icon: FaMicrophoneAlt,
  fields: [
    {
      name: 'episodes',
      title: 'Episodes',
      type: 'reference',
      to: [{ type: 'podcastEpisodes' }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Podcast Episodes Section'
      }
    }
  }
}
