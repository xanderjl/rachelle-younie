import type { SchemaTypeDefinition } from 'sanity'

import { Preview } from './Preview'

export const embed: SchemaTypeDefinition = {
  name: 'embed',
  title: 'Embedable Link',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url'
    },
    {
      name: 'aspectRatio',
      title: 'AspectRatio',
      type: 'string',
      initialValue: '16:9',
      options: {
        list: ['16:9', '4:3', '1:1']
      }
    }
  ],
  preview: {
    select: {
      _key: '_key',
      url: 'url',
      aspectRatio: 'aspectRatio'
    }
  },
  components: {
    preview: Preview
  }
}
