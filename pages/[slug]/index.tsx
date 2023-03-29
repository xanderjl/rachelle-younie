import { SectionRenderer } from 'components/SectionRenderer'
import { createHmac } from 'crypto'
import type { Page as PageProps } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import { getPages } from 'hooks/data/useGetPages'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { useRouter } from 'next/router'
import { PreviewSuspense } from 'next-sanity/preview'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import { lazy } from 'react'
import { SWRConfig } from 'swr'
import baseUrl from 'utils/baseUrl'
import { createOgImageUrl } from 'utils/createOgImageUrl'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

interface StaticProps {
  slug: string | string[] | undefined
  fallback: {
    '/sanity/page': PageProps
    '/sanity/initialData': InitialData
  }
  preview: boolean
  token: string
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  fallback,
  preview,
  token
}) => {
  const { asPath } = useRouter()

  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPage slug={slug} />
      </PreviewSuspense>
    )
  }

  const {
    title,
    sections,
    metaDescription: description
  } = fallback['/sanity/page']
  const { siteTitle } = fallback['/sanity/initialData']
  const url = createOgImageUrl(
    siteTitle ?? '',
    title,
    slug as string,
    token
  ).toString()

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${baseUrl}${asPath}`,
      title,
      description,
      images: [
        {
          url,
          width: 1200,
          height: 627
        }
      ]
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
      <SectionRenderer sections={sections} />
    </SWRConfig>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages()
  const paths = pages
    .filter(page => !!page && page.slug !== 'home')
    .map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
  preview = false
}) => {
  const { slug } = params || {}
  const hmac = createHmac('sha256', process.env.NEXT_SHA_KEY)
  hmac.update(JSON.stringify({ slug }))
  const token = hmac.digest('hex')

  const page = await getPage(slug as string)
  const initialData = await getInitialData()

  const fallback = {
    '/sanity/page': page,
    '/sanity/initialData': initialData
  }

  return {
    props: {
      slug,
      fallback,
      preview,
      token
    }
  }
}

export default Page
