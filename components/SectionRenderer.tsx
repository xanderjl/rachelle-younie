import { Flex, FlexProps } from '@chakra-ui/react'
import { Section } from 'hooks/useGetPage'
import { FC } from 'react'

import { ContentSection } from './sections/ContentSection'

export interface SectionRendererProps extends FlexProps {
  sections?: Section[]
}

export const SectionRenderer: FC<SectionRendererProps> = ({
  sections,
  ...rest
}) => (
  <Flex py={12} direction='column' gap={6} {...rest}>
    {sections?.map(section => {
      const { _key } = section

      if ('content' in section) {
        const { content } = section

        return <ContentSection key={_key} value={content} />
      }
      if ('publications' in section) {
        const { publications } = section
        return <pre key={_key}>{JSON.stringify(publications, null, 2)}</pre>
      }
      if ('episodes' in section) {
        const { episodes } = section
        return <pre key={_key}>{JSON.stringify(episodes, null, 2)}</pre>
      }
    })}
  </Flex>
)
