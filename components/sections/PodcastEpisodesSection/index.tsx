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
  const { start, end } = pageRange()
  const first = pages.slice(0, start)
  const last = pages.slice(end, length)
  const isMiddle =
    currentPage > first.length && currentPage < length - last.length

  return (
    <Section display='flex' flexDir='column' gap={6} {...rest}>
      {slicedEpisodes?.map(episode => (
        <PodcastCard key={episode._key} episode={episode} />
      ))}
      <Flex flex={1} justify='center' gap={3}>
        <Button
          aria-label='Previous'
          as={IoIosArrowBack}
          p={3}
          colorScheme='burntOrange'
          onClick={prev}
        />
        <Flex align='flex-end' gap={3}>
          {first.slice(isMiddle ? 1 : 0).map(page => (
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
          {isMiddle ? (
            <>
              <Text as='span'>...</Text>
              <Button
                aria-label={`Page ${currentPage}`}
                key={currentPage}
                colorScheme='burntOrange'
                isDisabled={currentPage === currentPage}
                onClick={() => jump(currentPage)}
              >
                {currentPage}
              </Button>
              <Text as='span'>...</Text>
            </>
          ) : (
            <Text as='span'>...</Text>
          )}
          {last.slice(isMiddle ? 1 : 0).map(page => (
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
