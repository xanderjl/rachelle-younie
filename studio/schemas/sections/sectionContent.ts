import { BsPencilSquare } from 'react-icons/bs'
import { SchemaTypeDefinition } from 'sanity'

export const sectionContent: SchemaTypeDefinition = {
  name: 'sectionContent',
  title: 'Content Section',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Content Section',
        media: BsPencilSquare
      }
    }
  }
}
