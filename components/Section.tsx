import type { ContainerProps } from '@chakra-ui/react'
import { Container, forwardRef } from '@chakra-ui/react'

export const Section = forwardRef<ContainerProps, 'div'>(
  ({ children, ...rest }, ref) => {
    return (
      <Container
        display='flex'
        flexDir='column'
        maxW='container.md'
        py={2}
        _first={{ pt: 12 }}
        ref={ref}
        {...rest}
      >
        {children}
      </Container>
    )
  }
)
