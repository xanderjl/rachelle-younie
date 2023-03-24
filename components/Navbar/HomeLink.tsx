import type { LinkProps } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import NLink from 'next/link'
import type { FC } from 'react'

import { linkStyles } from './linkStyles'

export const HomeLink: FC<LinkProps> = ({ children, ...rest }) => (
  <Link
    as={NLink}
    href='/'
    fontFamily='DM Serif Display, sans serif'
    {...linkStyles}
    {...rest}
  >
    {children}
  </Link>
)
