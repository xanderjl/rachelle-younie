import type { SchemaTypeDefinition } from 'sanity'

export const flexDirection: SchemaTypeDefinition = {
  name: 'flexDirection',
  title: 'Flex Direction',
  type: 'string',
  options: {
    list: [
      { title: 'row', value: 'row' },
      { title: 'row-reverse', value: 'row-reverse' },
      { title: 'column', value: 'column' },
      { title: 'column-reverse', value: 'column-reverse' }
    ]
  },
  initialValue: { title: 'column', value: 'column' }
}
