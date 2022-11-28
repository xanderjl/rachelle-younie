import { SchemaTypeDefinition } from 'sanity'
import { AiOutlineFile } from 'react-icons/ai'

export const page: SchemaTypeDefinition = {
  name: 'page',
  title: 'Pages',
  icon: AiOutlineFile,
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
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'sectionSelector'
    }
  ]
}
