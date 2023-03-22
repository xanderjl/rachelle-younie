import { Image } from '@chakra-ui/react'
import type { PortableTextTypeComponentProps } from '@portabletext/react'
import type { Image as SanityImage } from 'sanity'
import { urlForDescriptiveImage } from 'utils/urlFor'

export interface DescriptiveImageProps {
  image?: SanityImage
  altText?: string
  maxWidth?: number
}

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
