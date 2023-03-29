import { Box, Heading, Image } from '@chakra-ui/react'
import { PortableText } from 'components/PortableText'
import { Section } from 'components/Section'
import { createHmac } from 'crypto'
import type { PoemPage as PoemPageProps } from 'hooks/data/useGetPoemPage'
import { getPoemPage } from 'hooks/data/useGetPoemPage'
import { getPoemRoutes } from 'hooks/data/useGetPoemRoutes'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { PreviewSuspense } from 'next-sanity/preview'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import { lazy } from 'react'
import { SWRConfig } from 'swr'
import baseUrl from 'utils/baseUrl'
import { createPoemOgImageUrl } from 'utils/createOgImageUrl'
import { urlForDescriptiveImage } from 'utils/urlFor'

const PreviewPoemPage = lazy(() =>
  import('components/previews/PreviewPoemPage').then(mod => ({
    default: mod.PreviewPoemPage
  }))
)

interface StaticProps {
  poem: string | string[] | undefined
  fallback: {
    '/sanity/poemPage': PoemPageProps
  }
  preview: boolean
  token: string
}

const PoemPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  poem,
  fallback,
  preview,
  token
}) => {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPoemPage poem={poem} />
      </PreviewSuspense>
    )
  }

  const { title, copy, scan, slug } = fallback['/sanity/poemPage']

  const src = scan?.image ? urlForDescriptiveImage(scan.image).url() : ''
  const url = createPoemOgImageUrl(poem as string, token).toString()

  const seo: NextSeoProps = {
    title,
    openGraph: {
      title,
      url: `${baseUrl}/${slug}`,
      images: [
        {
          url,
          width: 1200,
          height: 627,
          alt: title
        }
      ],
      type: 'image/png'
    },
    twitter: {
      handle: '@rachelleyounie',
      site: baseUrl,
      cardType: 'summary_large_image'
    }
  }

  return (
    <SWRConfig value={{ fallback }}>
      <NextSeo {...seo} />
      <Section gap={6}>
        <Image src={src} alt={title} pb={{ base: 2, md: 6 }} />
        <Heading>{title}</Heading>
        <Box pb={6}>
          <PortableText value={copy} />
        </Box>
      </Section>
    </SWRConfig>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const poemRoutes = await getPoemRoutes()
  const paths = poemRoutes
    .map(({ slug, poems }) =>
      poems
        .filter(poem => !!poem)
        .map(({ poem }) => ({
          params: {
            slug,
            poem
          }
        }))
    )
    .flat(1)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
  preview = false
}) => {
  const { poem } = params || {}
  const poemPage = await getPoemPage(poem as string)
  const hmac = createHmac('sha256', process.env.NEXT_SHA_KEY)
  hmac.update(JSON.stringify({ poem }))
  const token = hmac.digest('hex')

  return {
    props: {
      poem,
      fallback: {
        '/sanity/poemPage': poemPage
      },
      preview,
      token
    }
  }
}

export default PoemPage
