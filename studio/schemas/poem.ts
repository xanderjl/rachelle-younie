import { RiQuillPenFill } from 'react-icons/ri'
import type { SchemaTypeDefinition } from 'sanity'

export const poem: SchemaTypeDefinition = {
  name: 'poem',
  title: 'Poem',
  type: 'document',
  icon: RiQuillPenFill,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
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
      of: [{ type: 'block' }],
      validation: rule => rule.required()
    }
  ]
}
