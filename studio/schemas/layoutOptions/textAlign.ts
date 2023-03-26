import type { SchemaTypeDefinition } from 'sanity'

export const textAlign: SchemaTypeDefinition = {
  name: 'textAlign',
  title: 'Text Alignment',
  type: 'string',
  options: {
    list: [
      { title: 'left', value: 'left' },
      { title: 'center', value: 'center' },
      { title: 'right', value: 'right' },
      { title: 'justify', value: 'justify' }
    ]
  },
  initialValue: { title: 'left', value: 'left' }
}
