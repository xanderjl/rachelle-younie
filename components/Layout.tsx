import { Container, Flex, FlexProps } from '@chakra-ui/react'
import { useInitialData } from 'hooks/useInitialData'
import Head from 'next/head'
import { FC } from 'react'
import { urlFor } from 'utils/urlFor'

import Navbar from './Navbar'

const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  const { data } = useInitialData()
  const { favicon, metaDescription, siteTitle } = data || {}
  const faviconHref = favicon ? urlFor(favicon).url() : ''

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' type='image/x-icon' href={faviconHref} />
        <meta name='description' content={metaDescription} />
      </Head>
      <Flex minH='100vh' w='100%' direction='column' {...rest}>
        <Navbar />
        <Container maxW='container.lg'>{children}</Container>
      </Flex>
    </>
  )
}

export default Layout
