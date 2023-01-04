import { Box } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import { FC } from 'react'
import { PortableTextBlock } from 'sanity'

import { components } from './Components'

interface ContentSectionProps {
  value: PortableTextBlock
}

export const ContentSection: FC<ContentSectionProps> = ({ value }) => {
  return (
    <Box flex={1} py={3}>
      <PortableText value={value} components={components} />
    </Box>
  )
}
