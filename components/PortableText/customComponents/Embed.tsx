import { AspectRatio, Box } from '@chakra-ui/react'
import type { PortableTextTypeComponentProps } from '@portabletext/react'
import type { Embed as EmbedProps } from 'types/SanityPrimitives'

export const Embed = ({
  value
}: PortableTextTypeComponentProps<EmbedProps>) => {
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
}
