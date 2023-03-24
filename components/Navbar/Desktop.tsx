import type { BoxProps } from '@chakra-ui/react'
import { Box, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import { useInitialData } from 'hooks/data/useInitialData'
import NLink from 'next/link'
import type { FC } from 'react'

import { HomeLink } from './HomeLink'
import { linkStyles } from './linkStyles'

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
      <HomeLink>Rachelle Younie</HomeLink>
      <UnorderedList display='flex' gap={4} listStyleType='none'>
        {navigation?.map(({ slug, title }, i) => (
          <ListItem key={i}>
            <Link as={NLink} href={slug} {...linkStyles}>
              {title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}
