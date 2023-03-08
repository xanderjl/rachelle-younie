import type { BoxProps } from '@chakra-ui/react'
import { Box, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { useInitialData } from 'hooks/data/useInitialData'
import NLink from 'next/link'
import type { FC } from 'react'

export const Desktop: FC<BoxProps> = props => {
  const { data } = useInitialData()
  const { navigation } = data || {}

  return (
    <Box
      display={{ base: 'none', md: 'flex' }}
      justifyContent='space-between'
      py={4}
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
    </Box>
  )
}
