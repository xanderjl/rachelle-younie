import { BsPencilSquare } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const writing: SchemaTypeDefinition = {
  name: 'writing',
  title: 'Writing',
  icon: BsPencilSquare,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description:
        'If you do not provide a link to your publication, you\'ll be required to upload a copy of it in the "File" field.',
      hidden: ({ parent, value }) => !value && parent?.file !== undefined
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      description:
        "If you're unable to provide a link to your publication, you'll be required to upload a copy of it in this field.",
      hidden: ({ parent, value }) => !value && parent?.link !== undefined
    }
  ]
}
