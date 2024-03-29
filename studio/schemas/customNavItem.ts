import type { SchemaTypeDefinition } from 'sanity'

export const customNavItem: SchemaTypeDefinition = {
  name: 'customNavItem',
  title: 'Custom Nav Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore typescript doesn't know title field exists
        source: (_, ctx) => ctx.parent.title
      },
      validation: rule => rule.required()
    }
  ]
}
