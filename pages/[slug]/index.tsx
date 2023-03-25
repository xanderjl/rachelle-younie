import { SectionRenderer } from 'components/SectionRenderer'
import type { Page as PageProps } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import { getPages } from 'hooks/data/useGetPages'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
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

interface StaticProps {
  slug: string | string[] | undefined
  fallback: {
    '/sanity/page': PageProps
  }
  preview: boolean
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  fallback,
  preview
}) => {
  if (preview) {
    return (
      <PreviewSuspense fallback='Loading...'>
        <PreviewPage slug={slug} />
      </PreviewSuspense>
    )
  }

  const {
    title,
    sections,
    metaDescription: description
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
  const fallback = {
    '/sanity/page': page
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
