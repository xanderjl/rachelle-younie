import { Box, Button, Heading, Image } from '@chakra-ui/react'
import { PortableText } from 'components/PortableText'
import { Section } from 'components/Section'
import { groqQuery as poemPageQuery } from 'hooks/data/useGetPoemPage'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { usePreview } from 'studio/sanity.preview'
import { urlForDescriptiveImage } from 'utils/urlFor'

export interface PreviewPageProps {
  poem?: string | string[]
}

export const PreviewPoemPage: FC<PreviewPageProps> = ({ poem }) => {
  const previewData = usePreview(null, poemPageQuery, { poem: poem as string })
  const { title, scan, copy } = previewData || {}

  const src = scan?.image ? urlForDescriptiveImage(scan.image).url() : ''

  return (
    <>
      <NextSeo title={title} />
      <Section gap={6}>
        <Image src={src} alt={title} pb={{ base: 2, md: 6 }} />
        <Heading>{title}</Heading>
        <Box pb={6}>
          <PortableText value={copy} />
        </Box>
      </Section>
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
