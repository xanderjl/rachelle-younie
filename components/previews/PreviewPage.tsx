import { Button } from '@chakra-ui/react'
import { groqQuery as pageQuery } from 'hooks/data/useGetPage'
import { groqQuery as initialQuery } from 'hooks/data/useInitialData'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { usePreview } from 'studio/sanity.preview'

import { SectionRenderer } from '../SectionRenderer'

export interface PreviewPageProps {
  slug?: string | string[]
}

export const PreviewPage: FC<PreviewPageProps> = ({ slug }) => {
  const { route } = useRouter()
  const conditionalSlug = route === '/' ? 'home' : slug
  const previewInitialData = usePreview(null, initialQuery)
  const previewData = usePreview(null, pageQuery, {
    slug: conditionalSlug as string
  })
  const { siteTitle } = previewInitialData || {}
  const { title, sections } = previewData || {}

  return (
    <>
      <Head>
        <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
      </Head>
      <Button
        as={Link}
        href={`/api/exit-preview?slug=${slug}`}
        pos='absolute'
        bottom={3}
        right={3}
        colorScheme='blue'
        textDecor='none'
      >
        Exit Preview
      </Button>
      <SectionRenderer sections={sections} />
    </>
  )
}
