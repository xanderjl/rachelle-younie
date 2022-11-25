import { Container, Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'

import Navbar from './Navbar'

const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex minH='100vh' w='100%' direction='column' {...rest}>
      <Navbar />
      <Container maxW='container.lg'>{children}</Container>
    </Flex>
  )
}

export default Layout
