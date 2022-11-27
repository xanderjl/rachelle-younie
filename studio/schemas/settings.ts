import { SchemaTypeDefinition } from 'sanity'

export const settings: SchemaTypeDefinition = {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'metaDescription',
      title: 'Meta Description',
      description:
        'This field is supposed to be a short blurb about you or the purpose of your site. Usually under 150 characters. It helps with ✨SEO✨',
      type: 'text'
    }
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Site Settings'
      }
    }
  }
}
