import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import type {
  PortableTextComponents,
  PortableTextTypeComponentProps
} from '@portabletext/react'
import NLink from 'next/link'
import type { ImageAsset } from 'sanity'
import { urlFor } from 'utils/urlFor'

export interface DescriptiveImage {
  image?: ImageAsset
  altText?: string
}

type Ratio = '16:9' | '4:3' | '1:1'
export interface Embed {
  url: string
  aspectRatio: Ratio
}

export const components: PortableTextComponents = {
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
    descriptiveImage: ({
      value
    }: PortableTextTypeComponentProps<DescriptiveImage>) => {
      const { image, altText } = value || {}
      const src = image && urlFor(image).url()

      return <Image src={src} alt={altText} px={3} pt={3} pb={5} />
    },
    embed: ({ value }: PortableTextTypeComponentProps<Embed>) => {
      const { url, aspectRatio } = value || {}
      let ratio

      switch (aspectRatio) {
        case '1:1':
          ratio = 1
          break
        case '4:3':
          ratio = 4 / 3
          break
        default:
          ratio = 16 / 9
      }

      return (
        <AspectRatio ratio={ratio}>
          <Box
            as='iframe'
            src={url}
            w='100%'
            h='100%'
            top={0}
            left={0}
            frameBorder={0}
            allowFullScreen
          />
        </AspectRatio>
      )
    }
  }
}
