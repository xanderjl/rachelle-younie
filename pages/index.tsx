import { SectionRenderer } from 'components/SectionRenderer'
import type { Page } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { PreviewSuspense } from 'next-sanity/preview'
import { lazy } from 'react'
import { SWRConfig, useSWRConfig } from 'swr'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

export interface StaticProps {
  fallback: {
    '/sanity/page': Page
  }
  preview: boolean
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  preview
}) => {
  const { fallback } = useSWRConfig()
  const { title, metaDescription, sections } =
    (!preview && fallback['/sanity/page']) || {}
  const { siteTitle } = (!preview && fallback['/sanity/initialData']) || {}

  return preview ? (
    <PreviewSuspense fallback='Loading...'>
      <PreviewPage />
    </PreviewSuspense>
  ) : (
    <SWRConfig value={{ fallback }}>
      <Head>
        {siteTitle && (
          <title>{`${siteTitle}${title ? ` | ${title}` : ''}`}</title>
        )}
        {metaDescription && (
          <meta name='description' content={metaDescription} />
        )}
      </Head>
      <SectionRenderer sections={sections} />
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  preview = false
}) => {
  const page = await getPage('home')
  const fallback = {
    '/sanity/page': page
  }

  return {
    props: {
      fallback,
      preview
    }
  }
}

export default Home
