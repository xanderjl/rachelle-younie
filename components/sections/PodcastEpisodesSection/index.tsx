import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import type { SectionPodcastEpisodes } from 'hooks/data/useGetPage'
import type { FC } from 'react'

import PodcastCard from './PodcastCard'

export interface PodcastEpisodesSectionProps extends FlexProps {
  episodes: SectionPodcastEpisodes['episodes']
}

export const PodcastEpisodesSection: FC<PodcastEpisodesSectionProps> = ({
  episodes,
  ...rest
}) => {
  return (
    <Flex direction='column' gap={6} {...rest}>
      {episodes?.map(episode => {
        return <PodcastCard key={episode._key} episode={episode} />
      })}
    </Flex>
  )
}
