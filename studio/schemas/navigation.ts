import { AiOutlineLink } from 'react-icons/ai'
import type { SchemaTypeDefinition } from 'sanity'

export const navigation: SchemaTypeDefinition = {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'pages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page', icon: AiOutlineLink }] }]
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Navigation'
      }
    }
  }
}
