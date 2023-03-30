import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import type { FC } from 'react'
import type {
  Section,
  SectionContent,
  SectionHero,
  SectionPodcastEpisodes,
  SectionPoems,
  SectionSocials,
  SectionWriting
} from 'types/SanityPrimitives'

import { ContentSection } from './sections/ContentSection'
import { HeroSection } from './sections/HeroSection'
import { PodcastEpisodesSection } from './sections/PodcastEpisodesSection'
import { PoemsSection } from './sections/PoemsSection'
import { SocialsSection } from './sections/SocialsSection'
import { WritingSection } from './sections/WritingSection'

export interface SectionRendererProps extends FlexProps {
  sections?: Section[]
}

const isSectionContent = (section: Section): section is SectionContent =>
  section._type === 'sectionContent'
const isSectionHero = (section: Section): section is SectionHero =>
  section._type === 'sectionHero'
const isSectionPodcastEpisodes = (
  section: Section
): section is SectionPodcastEpisodes =>
  section._type === 'sectionPodcastEpisodes'
const isSectionPoems = (section: Section): section is SectionPoems =>
  section._type === 'sectionPoems'
const isSectionSocials = (section: Section): section is SectionSocials =>
  section._type === 'sectionSocials'
const isSectionWriting = (section: Section): section is SectionWriting =>
  section._type === 'sectionWriting'

export const SectionRenderer: FC<SectionRendererProps> = ({
  sections,
  ...rest
}) => (
  <Flex alignItems='stretch' direction='column' gap={6} {...rest}>
    {sections?.map(section => {
      const { _key, _type } = section

      if (isSectionContent(section)) {
        const { content } = section

        return <ContentSection key={_key} value={content} />
      }

      if (isSectionHero(section)) {
        const { _key, ...rest } = section

        return <HeroSection key={_key} {...rest} />
      }

      if (isSectionPodcastEpisodes(section)) {
        const { episodes } = section

        return <PodcastEpisodesSection key={_key} episodes={episodes} />
      }

      if (isSectionPoems(section)) {
        const { poems } = section

        return <PoemsSection key={_key} poems={poems} />
      }

      if (isSectionSocials(section)) {
        const { socials } = section

        return <SocialsSection key={_key} socials={socials} />
      }

      if (isSectionWriting(section)) {
        const { publications } = section

        return <WritingSection key={_key} publications={publications} />
      }
    })}
  </Flex>
)
