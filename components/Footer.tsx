import { Container } from '@chakra-ui/react'
import type { FC } from 'react'

export const Footer: FC = () => {
  const year = new Date().getFullYear()

  return (
    <Container
      as='footer'
      display='flex'
      justifyContent='center'
      alignItems='center'
      maxW='container.lg'
      py={3}
    >
      &copy; Copyright {year}, Rachelle Younie
    </Container>
  )
}
