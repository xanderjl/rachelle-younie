import type { BoxProps } from '@chakra-ui/react'
import { Box, Container, forwardRef } from '@chakra-ui/react'

import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export const Navbar = forwardRef<BoxProps, 'nav'>((props, ref) => {
  return (
    <Box
      zIndex='banner'
      position='fixed'
      top={0}
      w='100%'
      bg='cream.500'
      ref={ref}
      {...props}
    >
      <Container as='nav' maxW='container.xl' fontSize='xl'>
        <Desktop />
        <Mobile />
      </Container>
    </Box>
  )
})
