import { SectionRenderer } from 'components/SectionRenderer'
import type { Page as PageProps } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import { getPages } from 'hooks/data/useGetPages'
import { getInitialData } from 'hooks/data/useInitialData'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import Head from 'next/head'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'
import { SWRConfig, useSWRConfig } from 'swr'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

interface StaticProps {
  slug: string | string[] | undefined
  fallback: {
    '/sanity/page': PageProps
  }
  preview: boolean
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  preview
}) => {
  const { fallback } = useSWRConfig()

  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPage slug={slug} />
      </PreviewSuspense>
    )
  }

  const { siteTitle } = fallback['/sanity/initialData']
  const { title, sections } = fallback['/sanity/page']

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        {siteTitle && (
          <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
        )}
      </Head>
      <SectionRenderer sections={sections} />
    </SWRConfig>
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
  const page = await getPage(slug as string)
  const initialData = await getInitialData()
  const fallback = { '/sanity/page': page, '/sanity/initialData': initialData }

  if (preview) {
    return {
      props: {
        slug,
        fallback,
        preview
      }
    }
  }

  return {
    props: {
      slug,
      fallback,
      preview
    }
  }
}

export default Page
