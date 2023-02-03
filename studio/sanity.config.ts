import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { defaultDocumentNode } from './defaultDocumentNode'
import { schemaTypes } from './schemas'
import { structure } from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const isDev = process.env.NODE_ENV === 'development'
const plugins = [
  deskTool({ structure, defaultDocumentNode }),
  ...(isDev ? [visionTool()] : [])
]

export default defineConfig({
  name: 'default',
  title: 'Rachelle Younie',
  projectId,
  dataset,
  plugins,
  basePath: '/editor',
  schema: {
    types: schemaTypes
  }
})
