import { IoShareSocial } from 'react-icons/io5'
import type { SchemaTypeDefinition } from 'sanity'

export const social: SchemaTypeDefinition = {
  name: 'social',
  title: 'Social',
  icon: IoShareSocial,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: rule => rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      validation: rule => rule.required()
    }
  ]
}
