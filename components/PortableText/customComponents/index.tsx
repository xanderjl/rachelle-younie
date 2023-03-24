import {
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import type { PortableTextComponents } from '@portabletext/react'
import NLink from 'next/link'

import { DescriptiveImage } from './DescriptiveImage'
import { Embed } from './Embed'
import { ImageBlock } from './ImageBlock'

export const customComponents: PortableTextComponents = {
  marks: {
    em: ({ children }) => (
      <Text as='em' fontStyle='italic'>
        {children}
      </Text>
    ),
    link: ({ value, children }) => {
      const { href } = value || {}

      return (
        <Link as={NLink} href={href ? href : ''}>
          {children}
        </Link>
      )
    }
  },
  block: {
    h1: ({ children }) => (
      <Heading as='h1' size='3xl' mb={5}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as='h2' size='2xl' mb={4}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as='h3' size='xl' mb={3}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as='h4' size='lg' mb={2}>
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as='h5' size='md' mb={2}>
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as='h6' size='sm' mb={2}>
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text as='p' mb={4}>
        {children}
      </Text>
    )
  },
  list: {
    bullet: ({ children }) => <UnorderedList>{children}</UnorderedList>,
    number: ({ children }) => <OrderedList>{children}</OrderedList>
  },
  listItem: {
    bullet: ({ children }) => <ListItem>{children}</ListItem>,
    number: ({ children }) => <ListItem>{children}</ListItem>
  },
  types: {
    descriptiveImage: DescriptiveImage,
    embed: Embed,
    imageBlock: ImageBlock
  }
}
