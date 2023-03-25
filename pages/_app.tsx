import '@fontsource/dm-serif-display/400.css'
import '@fontsource/nanum-myeongjo/400.css'
import '@fontsource/nanum-myeongjo/700.css'
import '@fontsource/nanum-myeongjo/800.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AnalyticsProps } from '@vercel/analytics/react'
import { Analytics } from '@vercel/analytics/react'
import Layout from 'components/Layout'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import type { NextSeoProps } from 'next-seo'
import { DefaultSeo } from 'next-seo'
import { SWRConfig } from 'swr'
import { theme } from 'theme'
import { urlFor } from 'utils/urlFor'

interface CustomProps {
  fallback: {
    '/sanity/initialData': InitialData
  }
}

type CustomAppProps = AppProps & CustomProps
type CustomInitialProps = AppInitialProps & CustomProps

const beforeSendHandler: AnalyticsProps['beforeSend'] = e => {
  if (e.url.includes('/editor')) {
    return null
  }

  return e
}

const CustomApp = ({ Component, pageProps, fallback }: CustomAppProps) => {
  const {
    siteTitle,
    favicon,
    metaDescription: description
  } = fallback['/sanity/initialData']
  const router = useRouter()
  const isEditor = router.asPath.includes('/editor')
  const faviconHref = favicon && urlFor(favicon).url()

  const seo: NextSeoProps = {
    title: 'home',
    titleTemplate: `${siteTitle} | %s`,
    description,
    additionalLinkTags: [{ rel: 'icon', href: faviconHref ?? '' }]
  }

  return (
    <SWRConfig value={{ fallback }}>
      <Analytics beforeSend={beforeSendHandler} />
      {isEditor ? (
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      ) : (
        <ChakraProvider theme={theme}>
          <DefaultSeo {...seo} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      )}
    </SWRConfig>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<CustomInitialProps> => {
  const ctx = await App.getInitialProps(context)
  const initialData = await getInitialData()

  return {
    ...ctx,
    fallback: { '/sanity/initialData': initialData }
  }
}

export default CustomApp
