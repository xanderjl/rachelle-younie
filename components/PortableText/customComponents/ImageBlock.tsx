import { Flex, Image } from '@chakra-ui/react'
import type { PortableTextTypeComponentProps } from '@portabletext/react'
import { PortableText } from '@portabletext/react'
import type { ImageBlock as ImageBlockProps } from 'types/SanityPrimitives'
import { urlForDescriptiveImage } from 'utils/urlFor'

import { customComponents } from './index'

export const ImageBlock = ({
  value
}: PortableTextTypeComponentProps<ImageBlockProps>) => {
  const { image, imageAlignment, content, gap } = value
  const src = image && urlForDescriptiveImage(image.image, image.maxWidth).url()
  const flexDir = imageAlignment === 'left' ? 'row' : 'row-reverse'

  return (
    <Flex flexDir={{ base: 'column', md: flexDir }} gap={{ base: 4, md: gap }}>
      <Image src={src} alt={image?.altText} objectFit='contain' pt={3} pb={5} />
      <Flex flexDir='column'>
        <PortableText value={content} components={customComponents} />
      </Flex>
    </Flex>
  )
}
