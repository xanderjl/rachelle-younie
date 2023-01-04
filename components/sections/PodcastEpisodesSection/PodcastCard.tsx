import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FlexProps,
  Heading
} from '@chakra-ui/react'
import { PodcastEpisode } from 'hooks/data/useGetPage'
import React, { FC } from 'react'

import { Player } from './Player'

export interface PodcastCardProps extends FlexProps {
  episode: PodcastEpisode
}

const PodcastCard: FC<PodcastCardProps> = ({ episode, ...rest }) => {
  const { title, content, enclosure } = episode

  return (
    <Flex
      direction='column'
      p={6}
      gap={4}
      borderWidth={1}
      bg='whiteAlpha.700'
      borderColor='burntOrange.500'
      borderRadius='md'
      {...rest}
    >
      <Heading>{title}</Heading>
      <Player data={enclosure} />
      <Accordion allowToggle>
        <AccordionItem
          borderColor='burntOrange.500'
          _hover={{ borderColor: 'burntOrange.100' }}
        >
          <AccordionButton
            _hover={{ bg: 'burntOrange.100', color: 'white' }}
            _expanded={{
              bg: 'burntOrange.500',
              color: 'white'
            }}
          >
            <Box as='span' flex={1} textAlign='left'>
              Show Notes
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {content && (
              <Box
                css={{
                  p: {
                    paddingBottom: 12
                  }
                }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}

export default PodcastCard
