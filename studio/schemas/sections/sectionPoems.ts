import { RiQuillPenFill } from 'react-icons/ri'
import type { SchemaTypeDefinition } from 'sanity'

export const sectionPoems: SchemaTypeDefinition = {
  name: 'sectionPoems',
  title: 'Poems Section',
  type: 'object',
  icon: RiQuillPenFill,
  fields: [
    {
      name: 'poems',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'poem' }] }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Poems Section'
      }
    }
  }
}
