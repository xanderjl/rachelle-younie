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
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string'
    },
    {
      name: 'overlay',
      title: 'Darken Image',
      type: 'string',
      options: {
        list: [
          { title: 'none', value: 'transparent' },
          { title: '10%', value: 'blackAlpha.50' },
          { title: '20%', value: 'blackAlpha.100' },
          { title: '30%', value: 'blackAlpha.200' },
          { title: '40%', value: 'blackAlpha.300' },
          { title: '50%', value: 'blackAlpha.400' },
          { title: '60%', value: 'blackAlpha.500' },
          { title: '70%', value: 'blackAlpha.600' },
          { title: '80%', value: 'blackAlpha.700' },
          { title: '90%', value: 'blackAlpha.800' },
          { title: '100%', value: 'blackAlpha.900' }
        ]
      },
      initialValue: { title: 'none', value: 'transparent' }
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
