import { SectionRenderer } from 'components/SectionRenderer'
import { createHmac } from 'crypto'
import type { Page } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
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

export interface StaticProps {
  fallback: {
    '/sanity/page': Page
    '/sanity/initialData': InitialData
  }
  preview: boolean
  token: string
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
  preview,
  token
}) => {
  const { asPath } = useRouter()
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPage />
      </PreviewSuspense>
    )
  }

  const {
    title,
    metaDescription: description,
    sections
  } = fallback['/sanity/page']
  const { siteTitle } = fallback['/sanity/initialData']
  const url = createOgImageUrl(siteTitle ?? '', title, 'home', token).toString()
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
          height: 627,
          alt: title,
          type: 'image/png'
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

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  preview = false
}) => {
  const page = await getPage('home')
  const initialData = await getInitialData()
  const hmac = createHmac('sha256', process.env.NEXT_SHA_KEY)
  hmac.update(JSON.stringify({ slug: 'home' }))
  const token = hmac.digest('hex')

  const fallback = {
    '/sanity/page': page,
    '/sanity/initialData': initialData
  }

  return {
    props: {
      fallback,
      preview,
      token
    }
  }
}

export default Home
