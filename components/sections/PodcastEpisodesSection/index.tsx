import type { FlexProps } from '@chakra-ui/react'
import { Button, Flex } from '@chakra-ui/react'
import type { SectionPodcastEpisodes } from 'hooks/data/useGetPage'
import type { FC } from 'react'
import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { paginateArray } from 'utils/paginateArray'

import PodcastCard from './PodcastCard'

export interface PodcastEpisodesSectionProps extends FlexProps {
  episodes: SectionPodcastEpisodes['episodes']
}

export const PodcastEpisodesSection: FC<PodcastEpisodesSectionProps> = ({
  episodes,
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageSize = 10

  if (episodes) {
    const { array: slicedEpisodes, numPages } = paginateArray(
      episodes,
      currentPage,
      pageSize
    )

    return (
      <Flex direction='column' gap={6} {...rest}>
        {slicedEpisodes?.map(episode => (
          <PodcastCard key={episode._key} episode={episode} />
        ))}
        <Flex flex={1} maxW='70ch' justify='space-between' gap={6}>
          <Button
            as={IoIosArrowBack}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
          <Button
            as={IoIosArrowForward}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Flex>
      </Flex>
    )
  }

  return <></>
}
