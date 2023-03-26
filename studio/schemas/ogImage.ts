import type { SchemaTypeDefinition } from 'sanity'

export const ogImage: SchemaTypeDefinition = {
  name: 'ogImage',
  title: 'Open Graph Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        crop: true,
        hotspot: true
      }
    },
    {
      name: 'color',
      title: 'Text Color',
      type: 'string',
      initialValue: '#000000',
      validation: rule => rule.required()
    },
    {
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'left', value: 'left' },
          { title: 'center', value: 'center' },
          { title: 'right', value: 'right' },
          { title: 'justify', value: 'justify' }
        ]
      },
      initialValue: { title: 'left', value: 'left' },
      validation: rule => rule.required()
    },
    {
      name: 'flexDirection',
      title: 'Flex Direction',
      type: 'string',
      options: {
        list: [
          { title: 'row', value: 'row' },
          { title: 'row-reverse', value: 'row-reverse' },
          { title: 'column', value: 'column' },
          { title: 'column-reverse', value: 'column-reverse' }
        ]
      },
      initialValue: { title: 'column', value: 'column' },
      validation: rule => rule.required()
    },
    {
      name: 'justifyContent',
      title: 'Justify Content',
      type: 'string',
      options: {
        list: [
          { title: 'flex-start', value: 'flex-start' },
          { title: 'center', value: 'center' },
          { title: 'flex-end', value: 'flex-end' },
          { title: 'space-between', value: 'space-between' },
          { title: 'space-around', value: 'space-around' },
          { title: 'space-evenly', value: 'space-evenly' },
          { title: 'stretch', value: 'stretch' }
        ]
      },
      validation: rule => rule.required()
    },
    {
      name: 'alignItems',
      title: 'Align Items',
      type: 'string',
      options: {
        list: [
          { title: 'flex-start', value: 'flex-start' },
          { title: 'center', value: 'center' },
          { title: 'flex-end', value: 'flex-end' },
          { title: 'space-between', value: 'space-between' },
          { title: 'space-around', value: 'space-around' },
          { title: 'space-evenly', value: 'space-evenly' },
          { title: 'stretch', value: 'stretch' }
        ]
      },
      validation: rule => rule.required()
    }
  ]
}
