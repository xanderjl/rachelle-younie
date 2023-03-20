import type { FlexProps } from '@chakra-ui/react'
import { Button, Flex } from '@chakra-ui/react'
import { Section } from 'components/Section'
import type { SectionPodcastEpisodes } from 'hooks/data/useGetPage'
import { usePagination } from 'hooks/usePagination'
import type { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import PodcastCard from './PodcastCard'

export interface PodcastEpisodesSectionProps extends FlexProps {
  episodes: SectionPodcastEpisodes['episodes']
}

export const PodcastEpisodesSection: FC<PodcastEpisodesSectionProps> = ({
  episodes,
  ...rest
}) => {
  const {
    currentData: slicedEpisodes,
    next,
    prev,
    jump
  } = usePagination(episodes, 10)

  return (
    <Section display='flex' flexDir='column' gap={6} {...rest}>
      {slicedEpisodes?.map(episode => (
        <PodcastCard key={episode._key} episode={episode} />
      ))}
      <Flex flex={1} justify='space-between' gap={6}>
        <Button as={IoIosArrowBack} colorScheme='burntOrange' onClick={next} />
        <Button colorScheme='burntOrange' onClick={() => jump(2)}>
          FUCK
        </Button>
        <Button
          as={IoIosArrowForward}
          colorScheme='burntOrange'
          onClick={prev}
        />
      </Flex>
    </Section>
  )
}
