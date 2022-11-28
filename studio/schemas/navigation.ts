import { SchemaTypeDefinition } from 'sanity'
import { AiOutlineLink } from 'react-icons/ai'

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
        }
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
