import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'rachelle-younie',
  projectId: 'myqwntha',
  dataset: 'production',
  plugins: [deskTool()],
  basePath: '/editor',
  schema: {
    types: schemaTypes
  }
})
