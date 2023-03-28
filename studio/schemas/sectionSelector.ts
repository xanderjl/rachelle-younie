import type { SchemaTypeDefinition } from 'sanity'

export const sectionSelector: SchemaTypeDefinition = {
  name: 'sectionSelector',
  title: 'Section Selector',
  type: 'object',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'sectionContent' },
        { type: 'sectionHero' },
        { type: 'sectionPodcastEpisodes' },
        { type: 'sectionPoems' },
        { type: 'sectionWriting' },
        { type: 'sectionSocials' }
      ]
    }
  ]
}
