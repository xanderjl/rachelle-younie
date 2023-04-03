import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { ImageUrlBuilder } from 'sanity'
import { client } from 'studio/sanity.client'

const builder = imageUrlBuilder(client)

export const urlFor = (src: SanityImageSource): ImageUrlBuilder =>
  builder.image(src).format('webp')

export const urlForDescriptiveImage = (
  src: SanityImageSource,
  maxWidth?: number
): ImageUrlBuilder => {
  return maxWidth
    ? builder.image(src).format('webp').width(maxWidth)
    : builder.image(src).format('webp')
}
