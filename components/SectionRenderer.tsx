import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import type {
  Section,
  SectionContent,
  SectionHero,
  SectionPodcastEpisodes,
  SectionPoems,
  SectionWriting
} from 'hooks/data/useGetPage'
import type { FC } from 'react'

import { ContentSection } from './sections/ContentSection'
import { HeroSection } from './sections/HeroSection'
import { PodcastEpisodesSection } from './sections/PodcastEpisodesSection'
import { PoemsSection } from './sections/PoemsSection'
import { WritingSection } from './sections/WritingSection'

export interface SectionRendererProps extends FlexProps {
  sections?: Section[]
}

export const SectionRenderer: FC<SectionRendererProps> = ({
  sections,
  ...rest
}) => (
  <Flex alignItems='stretch' direction='column' gap={6} {...rest}>
    {sections?.map(section => {
      const { _key, _type } = section

      if (_type === 'sectionContent') {
        const { content } = section as SectionContent

        return <ContentSection key={_key} value={content} />
      }

      if (_type === 'sectionHero') {
        const { backgroundImage, size, subtitle, title } =
          section as SectionHero

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

      if (_type === 'sectionPodcastEpisodes') {
        const { episodes } = section as SectionPodcastEpisodes

        return <PodcastEpisodesSection key={_key} episodes={episodes} />
      }

      if (_type === 'sectionPoems') {
        const { poems } = section as SectionPoems
        return <PoemsSection key={_key} poems={poems} />
      }

      if (_type === 'sectionWriting') {
        const { publications } = section as SectionWriting

        return <WritingSection key={_key} publications={publications} />
      }
    })}
  </Flex>
)
