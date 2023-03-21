import type { ContainerProps } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import type { FC } from 'react'

export const Section: FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <Container
      display='flex'
      flexDir='column'
      maxW='container.md'
      py={8}
      {...rest}
    >
      {children}
    </Container>
  )
}
