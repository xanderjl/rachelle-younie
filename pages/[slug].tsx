import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery
} from '@tanstack/react-query'
import { SectionRenderer } from 'components/SectionRenderer'
import { getPage } from 'hooks/useGetPage'
import { getPages } from 'hooks/useGetPages'
import { useInitialData } from 'hooks/useInitialData'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import Head from 'next/head'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug
}) => {
  const { data: initialData } = useInitialData()
  const { siteTitle } = initialData || {}
  const { data } = useQuery(['page', slug], () => getPage(slug as string))
  const { title, sections } = data || {}

  return (
    <>
      <Head>
        <title>
          {siteTitle} | {title}
        </title>
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

export const getStaticProps: GetStaticProps<{
  slug: string | string[] | undefined
  dehydratedState: DehydratedState
}> = async ({ params }) => {
  const { slug } = params || {}
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['page', slug],
    queryFn: () => getPage(slug as string),
    staleTime: Infinity,
    cacheTime: Infinity
  })

  return { props: { slug, dehydratedState: dehydrate(queryClient) } }
}

export default Page
