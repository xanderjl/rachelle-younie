import '@fontsource/dawning-of-a-new-day/400.css'
import '@fontsource/nanum-myeongjo/400.css'
import '@fontsource/nanum-myeongjo/700.css'
import '@fontsource/nanum-myeongjo/800.css'

import { ChakraProvider } from '@chakra-ui/react'
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { theme } from 'theme'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const isEditor = router.asPath.includes('/editor')

  return (
    <ChakraProvider theme={theme}>
      {isEditor ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  )
}

export default App
