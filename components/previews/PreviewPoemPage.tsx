import { Button, Heading } from '@chakra-ui/react'
import { groqQuery as poemPageQuery } from 'hooks/data/useGetPoemPage'
import { groqQuery as initialQuery } from 'hooks/data/useInitialData'
import Head from 'next/head'
import Link from 'next/link'
import type { FC } from 'react'
import { usePreview } from 'studio/sanity.preview'

export interface PreviewPageProps {
  poem?: string | string[]
}

export const PreviewPoemPage: FC<PreviewPageProps> = ({ poem }) => {
  const previewInitialData = usePreview(null, initialQuery)
  const previewData = usePreview(null, poemPageQuery, { poem: poem as string })
  const { siteTitle } = previewInitialData || {}
  const { title } = previewData || {}

  return (
    <>
      <Head>
        <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
      </Head>
      <Heading>HELLO</Heading>
      <Button
        as={Link}
        href={`/api/exit-preview?poem=${poem}`}
        pos='absolute'
        bottom={3}
        right={3}
        colorScheme='blue'
        textDecor='none'
      >
        Exit Preview
      </Button>
    </>
  )
}
