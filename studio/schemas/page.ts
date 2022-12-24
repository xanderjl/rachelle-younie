import { AiOutlineFile } from 'react-icons/ai'
import { SchemaTypeDefinition } from 'sanity'

export const page: SchemaTypeDefinition = {
  name: 'page',
  title: 'Pages',
  icon: AiOutlineFile,
  type: 'document',
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
      name: 'sections',
      title: 'Sections',
      type: 'sectionSelector'
    }
  ]
}
