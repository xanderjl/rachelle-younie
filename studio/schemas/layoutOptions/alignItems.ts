import type { SchemaTypeDefinition } from 'sanity'

export const alignItems: SchemaTypeDefinition = {
  name: 'alignItems',
  title: 'Align Items',
  type: 'string',
  options: {
    list: [
      { title: 'flex-start', value: 'flex-start' },
      { title: 'center', value: 'center' },
      { title: 'flex-end', value: 'flex-end' },
      { title: 'space-between', value: 'space-between' },
      { title: 'space-around', value: 'space-around' },
      { title: 'space-evenly', value: 'space-evenly' },
      { title: 'stretch', value: 'stretch' }
    ]
  },
  initialValue: { title: 'flex-start', value: 'flex-start' }
}
