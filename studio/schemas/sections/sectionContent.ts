import { BsPencilSquare } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionContent: SchemaTypeDefinition = {
  name: 'sectionContent',
  title: 'Content Section',
  type: 'object',
  icon: BsPencilSquare,
  fields: [
    {
      name: 'content',
      type: 'contentBlock'
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Content Section'
      }
    }
  }
}
