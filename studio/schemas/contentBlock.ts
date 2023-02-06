import { BsFillImageFill } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const contentBlock: SchemaTypeDefinition = {
  name: 'contentBlock',
  title: 'Content',
  type: 'array',
  of: [
    { type: 'block' },
    {
      name: 'descriptiveImage',
      title: 'Image',
      type: 'object',
      icon: BsFillImageFill,
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
          description: 'Optional, but makes your site more accessible.'
        }
      ]
    },
    { type: 'embed' }
  ]
}
