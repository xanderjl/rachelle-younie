import { AiOutlineFile } from 'react-icons/ai'
import type { SchemaTypeDefinition } from 'sanity'

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
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description:
        "This field is what pops up in search engine cards. It's mostly important for SEO, but isn't strictly required. If this field isn't filled out, the meta description in your site settings tab will take over as the default."
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'sectionSelector'
    }
  ]
}
