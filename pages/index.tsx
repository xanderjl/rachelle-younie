import { SectionRenderer } from 'components/SectionRenderer'
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
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
  preview
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
  const url = createOgImageUrl(siteTitle ?? '', title).toString()
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
  const fallback = {
    '/sanity/page': page,
    '/sanity/initialData': initialData
  }

  return {
    props: {
      fallback,
      preview
    }
  }
}

export default Home
