import type { FlexProps } from '@chakra-ui/react'
import { Container, Flex } from '@chakra-ui/react'
import { useSize } from '@chakra-ui/react-use-size'
import { useInitialData } from 'hooks/data/useInitialData'
import Head from 'next/head'
import type { FC } from 'react'
import { useRef } from 'react'
import { urlFor } from 'utils/urlFor'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  const { data } = useInitialData()
  const { favicon, metaDescription, siteTitle } = data || {}
  const faviconHref = favicon ? urlFor(favicon).url() : ''
  const navRef = useRef<HTMLElement>(null)
  const navDims = useSize(navRef)

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' type='image/x-icon' href={faviconHref} />
        <meta name='description' content={metaDescription} />
      </Head>
      <Flex minH='100vh' w='100%' direction='column' {...rest}>
        <Navbar ref={navRef} />
        <Container
          as='main'
          flex={1}
          maxW='container.lg'
          pt={`${navDims?.height}px`}
        >
          {children}
        </Container>
        <Footer />
      </Flex>
    </>
  )
}

export default Layout
