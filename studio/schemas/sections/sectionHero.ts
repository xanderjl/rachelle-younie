import { BsPencilSquare } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionHero: SchemaTypeDefinition = {
  name: 'sectionHero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'sm', value: 'sm' },
          { title: 'md', value: 'md' },
          { title: 'lg', value: 'lg' }
        ]
      },
      initialValue: { title: 'md', value: 'md' },
      validation: rule => rule.required()
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Hero Section',
        media: BsPencilSquare
      }
    }
  }
}
