import { IoShareSocial } from 'react-icons/io5'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionSocials: SchemaTypeDefinition = {
  name: 'sectionSocials',
  title: 'Socials Section',
  icon: IoShareSocial,
  type: 'object',
  fields: [
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'social' } }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Socials Section'
      }
    }
  }
}
