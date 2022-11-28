import { SchemaTypeDefinition } from 'sanity'

export const sectionSelector: SchemaTypeDefinition = {
  name: 'sectionSelector',
  title: 'Section Selector',
  type: 'object',
  fields: [
    {
      name: 'sections',
      title: 'sections',
      type: 'array',
      of: [{ type: 'sectionContent' }]
    }
  ]
}
