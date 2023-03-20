import type { SchemaTypeDefinition } from 'sanity'

export const poem: SchemaTypeDefinition = {
  name: 'poem',
  title: 'Poem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'scan',
      title: 'Scan',
      type: 'descriptiveImage',
      validation: rule => rule.required()
    },
    {
      name: 'copy',
      title: 'Copy',
      type: 'array',
      of: [{ type: 'contentBlock' }],
      validation: rule => rule.required()
    }
  ]
}
