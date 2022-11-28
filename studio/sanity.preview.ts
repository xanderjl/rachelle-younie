'use client'

import { definePreview } from 'next-sanity/preview'
import { projectId, dataset } from './sanity.client'

const onPublicAccessOnly = () => {
  throw new Error(`Unable to load preview as you're not logged in.`)
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly
})
