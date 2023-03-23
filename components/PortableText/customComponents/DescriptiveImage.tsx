import { Image } from '@chakra-ui/react'
import type { PortableTextTypeComponentProps } from '@portabletext/react'
import type { DescriptiveImage as DescriptiveImageProps } from 'types/SanityPrimitives'
import { urlForDescriptiveImage } from 'utils/urlFor'

export const DescriptiveImage = ({
  value
}: PortableTextTypeComponentProps<DescriptiveImageProps>) => {
  const { image, altText, maxWidth } = value || {}
  const src = image && urlForDescriptiveImage(image, maxWidth).url()

  return (
    <Image
      flex={1}
      src={src}
      alt={altText}
      maxW={maxWidth}
      objectFit='contain'
      pt={3}
      pb={5}
    />
  )
}
