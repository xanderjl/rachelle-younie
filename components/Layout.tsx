import type { FlexProps } from '@chakra-ui/react'
import { Container, Flex } from '@chakra-ui/react'
import { useSize } from '@chakra-ui/react-use-size'
import type { FC } from 'react'
import { useRef } from 'react'

import { Footer } from './Footer'
import { Navbar } from './Navbar'

const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  const navRef = useRef<HTMLElement>(null)
  const navDims = useSize(navRef)

  return (
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
  )
}

export default Layout
