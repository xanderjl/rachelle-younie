import {
  Container,
  Flex,
  FlexProps,
  Link,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import { useInitialData } from 'hooks/useInitialData'
import NLink from 'next/link'
import { FC } from 'react'

const Navbar: FC<FlexProps> = props => {
  const { data } = useInitialData()
  const { navigation } = data || {}

  return (
    <Container
      as='nav'
      display='flex'
      justifyContent='space-between'
      maxW='container.lg'
      fontSize='xl'
      {...props}
    >
      <Link as={NLink} href='/'>
        Rachelle Younie
      </Link>
      <UnorderedList display='flex' gap={4} listStyleType='none'>
        {navigation?.map(({ slug, title }, i) => (
          <ListItem key={i}>
            <Link as={NLink} href={slug}>
              {title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Container>
  )
}

export default Navbar
