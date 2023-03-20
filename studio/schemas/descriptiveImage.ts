import { BsFillImageFill } from 'react-icons/bs'
import type { SchemaTypeDefinition } from 'sanity'

export const descriptiveImage: SchemaTypeDefinition = {
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
      name: 'maxWidth',
      title: 'Max Width',
      type: 'number'
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Optional, but makes your site more accessible.'
    }
  ]
}
