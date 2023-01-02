import { dehydrate, QueryClient } from '@tanstack/react-query'
import { SectionRenderer } from 'components/SectionRenderer'
import { getLandingPageData, useGetLandingPage } from 'hooks/useGetLandingPage'
import { useInitialData } from 'hooks/useInitialData'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const { data } = useGetLandingPage()
  const { data: initialData } = useInitialData()
  const { title, metaDescription, sections } = data || {}
  const { siteTitle } = initialData || {}
  return (
    <>
      <Head>
        <title>{`${siteTitle ? siteTitle : ''}${
          title ? ` | ${title}` : ''
        }`}</title>
        {metaDescription && (
          <meta name='description' content={metaDescription} />
        )}
      </Head>
      <SectionRenderer sections={sections} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['landing-page'], getLandingPageData)

  return {
    props: {
      dehydratedData: dehydrate(queryClient)
    }
  }
}

export default Home
