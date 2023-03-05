import { BsPencilSquare } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionWriting: SchemaTypeDefinition = {
  name: 'sectionWriting',
  title: 'Writing Section',
  icon: BsPencilSquare,
  type: 'object',
  fields: [
    {
      name: 'publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'writing' }]
        }
      ]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Writing Section'
      }
    }
  }
}
