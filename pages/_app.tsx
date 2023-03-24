import '@fontsource/dm-serif-display/400.css'
import '@fontsource/nanum-myeongjo/400.css'
import '@fontsource/nanum-myeongjo/700.css'
import '@fontsource/nanum-myeongjo/800.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import Layout from 'components/Layout'
import type { InitialData } from 'hooks/data/useInitialData'
import { getInitialData } from 'hooks/data/useInitialData'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { theme } from 'theme'

interface CustomProps {
  fallback: {
    '/sanity/initialData': InitialData
  }
}

type CustomAppProps = AppProps & CustomProps
type CustomInitialProps = CustomProps & AppInitialProps

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  const router = useRouter()
  const isEditor = router.asPath.includes('/editor')

  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      {isEditor ? (
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      ) : (
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Analytics
            beforeSend={e => {
              if (e.url.includes('/editor')) {
                return null
              }

              return e
            }}
          />
        </ChakraProvider>
      )}
    </SWRConfig>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<CustomInitialProps> => {
  const initalProps = await App.getInitialProps(context)
  const initialData = await getInitialData()

  return {
    ...initalProps,
    fallback: { '/sanity/initialData': initialData }
  }
}

export default CustomApp
