import { SectionRenderer } from 'components/SectionRenderer'
import type { Page } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { PreviewSuspense } from 'next-sanity/preview'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import { lazy } from 'react'
import { SWRConfig } from 'swr'

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
  fallback,
  preview
}) => {
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
  const seo: NextSeoProps = {
    title,
    description
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
