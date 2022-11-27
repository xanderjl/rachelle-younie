import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'rachelle-younie',
  projectId: 'myqwntha',
  dataset: 'production',
  plugins: [deskTool({ structure })],
  basePath: '/editor',
  schema: {
    types: schemaTypes
  }
})
