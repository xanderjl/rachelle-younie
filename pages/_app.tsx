import '@fontsource/dm-serif-display/400.css'
import '@fontsource/sacramento/400.css'
import '@fontsource/nanum-myeongjo/400.css'
import '@fontsource/nanum-myeongjo/700.css'
import '@fontsource/nanum-myeongjo/800.css'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from 'components/Layout'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import { pageview } from 'lib/gtag'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { NextSeoProps } from 'next-seo'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
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
    additionalLinkTags: [{ rel: 'icon', href: faviconHref ?? '' }],
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  }

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <SWRConfig value={{ fallback }}>
      {isEditor ? (
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      ) : (
        <ChakraProvider theme={theme}>
          <DefaultSeo {...seo} />
          <Layout>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
              `}
            </Script>
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
