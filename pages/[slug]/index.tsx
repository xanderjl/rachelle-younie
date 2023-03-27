import { SectionRenderer } from 'components/SectionRenderer'
import type { Page as PageProps } from 'hooks/data/useGetPage'
import { getPage } from 'hooks/data/useGetPage'
import { getPages } from 'hooks/data/useGetPages'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { useRouter } from 'next/router'
import { PreviewSuspense } from 'next-sanity/preview'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import { lazy } from 'react'
import { SWRConfig } from 'swr'
import baseUrl from 'utils/baseUrl'
import { createOgImageUrl } from 'utils/createOgImageUrl'

const PreviewPage = lazy(() =>
  import('components/previews/PreviewPage').then(mod => ({
    default: mod.PreviewPage
  }))
)

interface StaticProps {
  slug: string | string[] | undefined
  fallback: {
    '/sanity/page': PageProps
    '/sanity/initialData': InitialData
  }
  preview: boolean
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  slug,
  fallback,
  preview
}) => {
  const { asPath } = useRouter()

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
  const { siteTitle } = fallback['/sanity/initialData']
  const url = createOgImageUrl(siteTitle ?? '', title).toString()

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${baseUrl}${asPath}`,
      title,
      description,
      images: [
        {
          url,
          width: 1200,
          height: 627
        }
      ]
    }
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
  const initialData = await getInitialData()
  const fallback = {
    '/sanity/page': page,
    '/sanity/initialData': initialData
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
