import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from 'studio/sanity.client'

const builder = imageUrlBuilder(client)

export const urlFor = (src: SanityImageSource) => builder.image(src)
