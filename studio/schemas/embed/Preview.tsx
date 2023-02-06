import { AspectRatio, Box, forwardRef } from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import type { PreviewProps } from 'sanity'

type Ratio = '16:9' | '4:3' | '1:1'

interface EmbedPreviewProps extends PreviewProps {
  url: string
  aspectRatio: Ratio
}

export const Preview: FC<EmbedPreviewProps> = forwardRef<
  EmbedPreviewProps,
  'div'
>(({ url, aspectRatio }, ref) => {
  let ratio

  switch (aspectRatio) {
    case '4:3':
      ratio = 4 / 3
      break
    case '1:1':
      ratio = 1
      break
    default:
      ratio = 16 / 9
  }

  return (
    <AspectRatio ratio={ratio}>
      <Box
        as='iframe'
        ref={ref}
        padding={4}
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
})
