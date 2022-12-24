import { AiOutlineLink } from 'react-icons/ai'
import { SchemaTypeDefinition } from 'sanity'

export const navigation: SchemaTypeDefinition = {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'pages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page', icon: AiOutlineLink }]
        },
        { type: 'customNavItem' }
      ]
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