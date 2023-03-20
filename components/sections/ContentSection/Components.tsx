import {
  AspectRatio,
  Box,
  Flex,
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
import { PortableText } from '@portabletext/react'
import NLink from 'next/link'
import type { Image as SanityImage } from 'sanity'
import { urlFor } from 'utils/urlFor'

export interface DescriptiveImage {
  image?: SanityImage
  altText?: string
}

type Ratio = '16:9' | '4:3' | '1:1'
export interface Embed {
  url: string
  aspectRatio: Ratio
}

export interface ImageBlock {
  image: Required<DescriptiveImage>
  imageAlignment: 'left' | 'right'
  content: any
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
      <Heading as='h1' size='2xl' mb={5}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as='h2' size='xl' mb={4}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as='h3' size='lg' mb={3}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as='h4' size='md' mb={2}>
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
      const ratioLookup = {
        '1:1': 1,
        '4:3': 4 / 3,
        '16:9': 16 / 9
      }
      const ratio = ratioLookup[aspectRatio]

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
    },
    imageBlock: ({ value }: PortableTextTypeComponentProps<ImageBlock>) => {
      const { image, imageAlignment, content } = value
      const src = urlFor(image.image).url()
      const flexDir = imageAlignment === 'left' ? 'row' : 'row-reverse'

      return (
        <Flex
          flexDir={{ base: 'column', md: flexDir }}
          gap={4}
          alignItems={{ md: 'center' }}
        >
          <Image src={src} alt={image?.altText} px={3} pt={3} pb={5} />
          <Flex flexDir='column'>
            <PortableText value={content} components={components} />
          </Flex>
        </Flex>
      )
    }
  }
}
