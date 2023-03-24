import type { FlexProps } from '@chakra-ui/react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { Section } from 'components/Section'
import { usePagination } from 'hooks/usePagination'
import type { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import type { SectionPodcastEpisodes } from 'types/SanityPrimitives'

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
    numPages: length,
    pageRange
  } = usePagination(episodes, 5)

  const pages = Array.from({ length }, (_, i) => i + 1)
  const first = pages[0]
  const last = pages.length
  const { start, end } = pageRange(currentPage, length, 2)
  const middle = pages.slice(start, end)

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
          <Button
            aria-label={`Page ${first}`}
            key={first}
            colorScheme='burntOrange'
            isDisabled={currentPage === first}
            onClick={() => jump(first)}
          >
            {first}
          </Button>
          <Text as='span'>...</Text>
          {middle.map(page => (
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
          <Text as='span'>...</Text>
          <Button
            aria-label={`Page ${last}`}
            key={last}
            colorScheme='burntOrange'
            isDisabled={currentPage === last}
            onClick={() => jump(last)}
          >
            {last}
          </Button>
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
