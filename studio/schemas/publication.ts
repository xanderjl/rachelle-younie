import { SchemaTypeDefinition } from 'sanity'

export const publication: SchemaTypeDefinition = {
  name: 'publication',
  title: 'Publication',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url'
    }
  ]
}
