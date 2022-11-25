import {
  Flex,
  FlexProps,
  Link,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import NLink from 'next/link'
import { FC } from 'react'
import routes from 'routes'

const Navbar: FC<FlexProps> = props => {
  return (
    <Flex as='nav' justify='space-around' fontSize='xl' {...props}>
      Navbar
      <UnorderedList display='flex' gap={4} listStyleType='none'>
        {routes.map((route, i) => {
          const { href, label } = route
          return (
            <ListItem key={i}>
              <Link as={NLink} href={href}>
                {label}
              </Link>
            </ListItem>
          )
        })}
      </UnorderedList>
    </Flex>
  )
}

export default Navbar
