import type { SchemaTypeDefinition } from 'sanity'

export const settings: SchemaTypeDefinition = {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description:
        "This is the base title that shows up in a browser tab. (eg: setting the title to 'Rachelle Younie' and then navigationg to https://www.rachelleyounie.com/about would look like: Rachelle Younie | About)"
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: "The lil' icon in the browser tab for your site."
    },
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
