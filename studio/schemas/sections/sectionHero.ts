import { RiLayoutTop2Line } from 'react-icons/ri'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionHero: SchemaTypeDefinition = {
  name: 'sectionHero',
  title: 'Hero Section',
  type: 'object',
  icon: RiLayoutTop2Line,
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
          { title: 'lg', value: 'lg' },
          { title: 'half', value: 'half' },
          { title: 'fullscreen', value: 'fullscreen' }
        ]
      },
      initialValue: { title: 'md', value: 'md' },
      validation: rule => rule.required()
    },
    {
      name: 'color',
      title: 'Text Color',
      type: 'string'
    },
    {
      name: 'textAlign',
      type: 'textAlign',
      validation: rule => rule.required()
    },
    {
      name: 'flexDirection',
      type: 'flexDirection',
      validation: rule => rule.required()
    },
    {
      name: 'justifyContent',
      type: 'justifyContent',
      validation: rule => rule.required()
    },
    {
      name: 'alignItems',
      type: 'alignItems',
      validation: rule => rule.required()
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Hero Section'
      }
    }
  }
}
