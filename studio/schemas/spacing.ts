import type { SchemaTypeDefinition } from 'sanity'

export const spacing: SchemaTypeDefinition = {
  name: 'spacing',
  title: 'Spacing',
  type: 'number',
  options: {
    list: [
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28,
      32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
    ]
  },
  initialValue: 4
}
