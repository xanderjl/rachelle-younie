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
  ]
}
