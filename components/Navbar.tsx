import {
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
    <Flex as='nav' justify='space-around' fontSize='xl' {...props}>
      Navbar
      <UnorderedList display='flex' gap={4} listStyleType='none'>
        {navigation?.map(({ slug, title }, i) => (
          <ListItem key={i}>
            <Link as={NLink} href={slug}>
              {title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  )
}

export default Navbar
