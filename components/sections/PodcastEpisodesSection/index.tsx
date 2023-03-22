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
    currentPage,
    next,
    prev,
    jump,
    numPages: length
  } = usePagination(episodes, 5)

  const pages = Array.from({ length }, (_, i) => i + 1)

  return (
    <Section display='flex' flexDir='column' gap={6} {...rest}>
      {slicedEpisodes?.map(episode => (
        <PodcastCard key={episode._key} episode={episode} />
      ))}
      <Flex flex={1} justify='space-between' gap={3}>
        <Button
          aria-label='Previous'
          as={IoIosArrowBack}
          p={3}
          colorScheme='burntOrange'
          onClick={prev}
        />
        <Flex gap={3}>
          {pages.map(page => (
            <Button
              aria-label={`Page ${page}`}
              key={page}
              colorScheme='burntOrange'
              isDisabled={currentPage === page}
              onClick={() => jump(page)}
            >
              {page}
            </Button>
          ))}
        </Flex>
        <Button
          as={IoIosArrowForward}
          aria-label='Next'
          p={3}
          colorScheme='burntOrange'
          onClick={next}
        />
      </Flex>
    </Section>
  )
}
