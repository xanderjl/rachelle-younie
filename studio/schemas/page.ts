import { SchemaTypeDefinition } from 'sanity'

export const page: SchemaTypeDefinition = {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: rule => rule.required()
    }
  ]
}