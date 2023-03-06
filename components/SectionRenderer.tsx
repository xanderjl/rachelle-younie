import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import type { Section } from 'hooks/data/useGetPage'
import type { FC } from 'react'

import { ContentSection } from './sections/ContentSection'
import { HeroSection } from './sections/HeroSection'
import { PodcastEpisodesSection } from './sections/PodcastEpisodesSection'
import { WritingSection } from './sections/WritingSection'

export interface SectionRendererProps extends FlexProps {
  sections?: Section[]
}

export const SectionRenderer: FC<SectionRendererProps> = ({
  sections,
  ...rest
}) => (
  <Flex alignItems='stretch' py={12} direction='column' gap={6} {...rest}>
    {sections?.map(section => {
      const { _key } = section

      if ('content' in section) {
        const { content } = section

        return <ContentSection key={_key} value={content} />
      }

      if ('backgroundImage' in section) {
        const { backgroundImage, size, subtitle, title } = section

        return (
          <HeroSection
            key={_key}
            backgroundImage={backgroundImage}
            size={size}
            subtitle={subtitle}
            title={title}
          />
        )
      }

      if ('episodes' in section) {
        const { episodes } = section

        return <PodcastEpisodesSection key={_key} episodes={episodes} />
      }

      if ('publications' in section) {
        const { publications } = section

        return <WritingSection key={_key} publications={publications} />
      }
    })}
  </Flex>
)
