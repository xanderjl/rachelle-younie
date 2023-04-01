import { Flex, Image } from '@chakra-ui/react'
import type { PortableTextTypeComponentProps } from '@portabletext/react'
import type { DescriptiveImage as DescriptiveImageProps } from 'types/SanityPrimitives'
import { urlForDescriptiveImage } from 'utils/urlFor'

export const DescriptiveImage = ({
  value
}: PortableTextTypeComponentProps<DescriptiveImageProps>) => {
  const { image, altText, maxWidth } = value || {}
  const src = image && urlForDescriptiveImage(image, maxWidth).url()

  return (
    <Flex justifyContent='center'>
      <Image
        src={src}
        alt={altText}
        maxW={{ md: maxWidth }}
        objectFit='contain'
        pt={3}
        pb={5}
      />
    </Flex>
  )
}
