import type { DehydratedState } from '@tanstack/react-query'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { SectionRenderer } from 'components/SectionRenderer'
import {
  getLandingPageData,
  useGetLandingPage
} from 'hooks/data/useGetLandingPage'
import { useInitialData } from 'hooks/data/useInitialData'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewLandingPage = lazy(() =>
  import('components/previews/PreviewLandingPage').then(mod => ({
    default: mod.PreviewLandingPage
  }))
)

export interface StaticProps {
  dehydratedState?: DehydratedState
  preview: Boolean
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  preview
}) => {
  const { data } = useGetLandingPage()
  const { data: initialData } = useInitialData()
  const { title, metaDescription, sections } = data || {}
  const { siteTitle } = initialData || {}

  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewLandingPage />
    </PreviewSuspense>
  ) : (
    <>
      <Head>
        {siteTitle && (
          <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
        )}
        {metaDescription && (
          <meta name='description' content={metaDescription} />
        )}
      </Head>
      <SectionRenderer sections={sections} />
    </>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  preview = false
}) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['landing-page'], getLandingPageData)

  if (preview) {
    return { props: { preview } }
  }

  return {
    props: {
      dehydratedData: dehydrate(queryClient),
      preview
    }
  }
}

export default Home
