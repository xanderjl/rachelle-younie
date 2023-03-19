import type { SchemaTypeDefinition } from 'sanity'

export const contentBlock: SchemaTypeDefinition = {
  name: 'contentBlock',
  title: 'Content',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'descriptiveImage' },
    { type: 'embed' },
    { type: 'imageBlock' }
  ]
}
