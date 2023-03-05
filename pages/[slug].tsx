import type { DehydratedState } from '@tanstack/react-query'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { SectionRenderer } from 'components/SectionRenderer'
import { getPage } from 'hooks/data/useGetPage'
import { getPages } from 'hooks/data/useGetPages'
import { useInitialData } from 'hooks/data/useInitialData'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import Head from 'next/head'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

interface StaticProps {
  slug: string | string[] | undefined
  dehydratedState?: DehydratedState
  preview: boolean
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  preview
}) => {
  const { data: initialData } = useInitialData()
  const { data } = useQuery(['page', slug], () => getPage(slug as string))
  const { siteTitle } = initialData || {}
  const { title, sections } = data || {}

  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPage slug={slug} />
    </PreviewSuspense>
  ) : (
    <>
      <Head>
        {siteTitle && (
          <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
        )}
      </Head>
      <SectionRenderer sections={sections} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages()
  const paths = pages.map(({ slug }) => ({ params: { slug } }))

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
  const queryClient = new QueryClient()

  if (preview) {
    return { props: { slug, preview } }
  }

  await queryClient.prefetchQuery({
    queryKey: ['page', slug],
    queryFn: () => getPage(slug as string),
    staleTime: Infinity,
    cacheTime: Infinity
  })

  return { props: { slug, dehydratedState: dehydrate(queryClient), preview } }
}

export default Page
