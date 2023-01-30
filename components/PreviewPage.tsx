import { groqQuery as pageQuery } from 'hooks/data/useGetPage'
import { groqQuery as initialQuery } from 'hooks/data/useInitialData'
import Head from 'next/head'
import type { FC } from 'react'
import { usePreview } from 'studio/sanity.preview'

import { SectionRenderer } from './SectionRenderer'






export interface PreviewPageProps {
  slug?: string | string[]
}

export const PreviewPage: FC<PreviewPageProps> = ({ slug }) => {
  const previewInitialData = usePreview(null, initialQuery)
  const previewData = usePreview(null, pageQuery, { slug: slug as string })
  const { siteTitle } = previewInitialData || {}
  const { title, sections } = previewData || {}

  return (
    <>
      <Head>
        <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
      </Head>
      <SectionRenderer sections={sections} />
    </>
  )
}
