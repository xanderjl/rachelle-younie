import type { SchemaTypeDefinition } from 'sanity'

export const imageBlock: SchemaTypeDefinition = {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'descriptiveImage'
    },
    {
      name: 'imageAlignment',
      title: 'Image Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'left', value: 'left' },
          { title: 'right', value: 'right' }
        ]
      },
      initialValue: { title: 'left', value: 'left' }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'contentBlock'
    }
  ]
}
