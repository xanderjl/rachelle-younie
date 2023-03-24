import { Section } from 'components/Section'
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
import { lazy } from 'react'
import { SWRConfig, useSWRConfig } from 'swr'

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
}

const PoemPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  poem,
  preview
}) => {
  const { fallback } = useSWRConfig()

  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPoemPage poem={poem} />
    </PreviewSuspense>
  ) : (
    <SWRConfig value={{ fallback }}>
      <Section>beep</Section>
    </SWRConfig>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const poemRoutes = await getPoemRoutes()
  const paths = poemRoutes
    .map(({ slug, poems }) =>
      poems.map(({ poem }) => ({
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

  return {
    props: {
      poem,
      fallback: {
        '/sanity/poemPage': poemPage
      },
      preview
    }
  }
}

export default PoemPage
