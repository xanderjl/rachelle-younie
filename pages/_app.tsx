import '@fontsource/dawning-of-a-new-day/400.css'
import '@fontsource/nanum-myeongjo/400.css'
import '@fontsource/nanum-myeongjo/700.css'
import '@fontsource/nanum-myeongjo/800.css'

import { ChakraProvider } from '@chakra-ui/react'
import {
  dehydrate,
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from 'components/Layout'
import { getInitialData } from 'hooks/data/useInitialData'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { theme } from 'theme'

const isDev = process.env.NODE_ENV === 'development'

interface CustomProps {
  dehydratedState: DehydratedState
}

type CustomAppProps = AppProps & CustomProps

type CustomInitialProps = CustomProps & AppInitialProps

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  const router = useRouter()
  const isEditor = router.asPath.includes('/editor')
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
        {isEditor ? (
          <Component {...pageProps} />
        ) : (
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        )}
      </Hydrate>
    </QueryClientProvider>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<CustomInitialProps> => {
  const initalProps = await App.getInitialProps(context)
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
      }
    }
  })
  await client.prefetchQuery({
    queryKey: ['initial-data'],
    queryFn: getInitialData,
    staleTime: Infinity,
    cacheTime: Infinity
  })
  const dehydratedState = dehydrate(client)

  return { ...initalProps, dehydratedState }
}

export default CustomApp
