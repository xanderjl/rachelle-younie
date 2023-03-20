import type { DehydratedState } from '@tanstack/react-query'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { SectionRenderer } from 'components/SectionRenderer'
import { getPage, useGetPage } from 'hooks/data/useGetPage'
import { useInitialData } from 'hooks/data/useInitialData'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

export interface StaticProps {
  dehydratedState?: DehydratedState
  preview: boolean
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  preview
}) => {
  const { data } = useGetPage('home')
  const { data: initialData } = useInitialData()
  const { title, metaDescription, sections } = data || {}
  const { siteTitle } = initialData || {}

  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPage />
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

  if (preview) {
    return { props: { preview } }
  }

  await queryClient.prefetchQuery({
    queryKey: ['page', 'home'],
    queryFn: () => getPage('home'),
    staleTime: Infinity,
    cacheTime: Infinity
  })

  return {
    props: {
      dehydratedData: dehydrate(queryClient),
      preview
    }
  }
}

export default Home
