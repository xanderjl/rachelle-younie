import { Button } from '@chakra-ui/react'
import { groqQuery as pageQuery } from 'hooks/data/useGetLandingPage'
import { groqQuery as initialQuery } from 'hooks/data/useInitialData'
import Head from 'next/head'
import Link from 'next/link'
import type { FC } from 'react'
import { usePreview } from 'studio/sanity.preview'

import { SectionRenderer } from '../SectionRenderer'

export const PreviewLandingPage: FC = () => {
  const previewInitialData = usePreview(null, initialQuery)
  const previewData = usePreview(null, pageQuery)
  const { siteTitle } = previewInitialData || {}
  const { title, sections } = previewData || {}

  return (
    <>
      <Head>
        <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
      </Head>
      <Button
        as={Link}
        href='/api/exit-preview'
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
