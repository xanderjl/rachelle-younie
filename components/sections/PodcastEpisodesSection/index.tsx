import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { SectionPodcastEpisodes } from 'hooks/useGetPage'
import { FC } from 'react'

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
