import type { DehydratedState } from '@tanstack/react-query'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Section } from 'components/Section'
import { getPoemPage } from 'hooks/data/useGetPoemPage'
import { getPoemRoutes } from 'hooks/data/useGetPoems'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'

const PreviewPoemPage = lazy(() =>
  import('components/previews/PreviewPoemPage').then(mod => ({
    default: mod.PreviewPoemPage
  }))
)

interface StaticProps {
  poem: string | string[] | undefined
  dehydratedState?: DehydratedState
  preview: boolean
}

const PoemPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  poem,
  preview
}) => {
  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPoemPage poem={poem} />
    </PreviewSuspense>
  ) : (
    <Section>beep</Section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const poems = await getPoemRoutes()
  const paths = poems.map(({ slug: poem }) => ({ params: { poem } }))
  console.log({ paths })

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
  const queryClient = new QueryClient()

  if (preview) {
    return { props: { poem, preview } }
  }

  await queryClient.prefetchQuery({
    queryKey: ['poem', poem],
    queryFn: () => getPoemPage(poem as string)
  })

  return {
    props: { poem, dehydratedState: dehydrate(queryClient), preview }
  }
}

export default PoemPage
