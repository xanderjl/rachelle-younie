import { SchemaTypeDefinition } from 'sanity'

export const episode: SchemaTypeDefinition = {
  name: 'episode',
  title: 'Episode',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text'
    },
    {
      name: 'contentSnippet',
      title: 'Content Snippet',
      type: 'text'
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'string'
    },
    {
      name: 'enclosure',
      title: 'Enclosure',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'url'
        },
        {
          name: 'length',
          title: 'Length',
          type: 'string'
        },
        {
          name: 'type',
          title: 'Type',
          type: 'string'
        }
      ]
    },
    {
      name: 'guid',
      title: 'GUID',
      type: 'string'
    },
    {
      name: 'isoDate',
      title: 'ISO Date',
      type: 'string'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url'
    },
    {
      name: 'pubDate',
      title: 'Publish Date',
      type: 'string'
    }
  ]
}
