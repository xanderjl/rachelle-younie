import { Flex, FlexProps } from '@chakra-ui/react'
import { Section } from 'hooks/data/useGetPage'
import { FC } from 'react'

import { ContentSection } from './sections/ContentSection'
import { PodcastEpisodesSection } from './sections/PodcastEpisodesSection'
import { WritingSection } from './sections/WritingSection'

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

        return <WritingSection key={_key} publications={publications} />
      }

      if ('episodes' in section) {
        const { episodes } = section

        return <PodcastEpisodesSection key={_key} episodes={episodes} />
      }
    })}
  </Flex>
)