import type { FlexProps } from '@chakra-ui/react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading
} from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import type { PodcastEpisode } from 'types/SanityPrimitives'

import { Player } from './Player'

export interface PodcastCardProps extends FlexProps {
  episode: PodcastEpisode
}

const PodcastCard: FC<PodcastCardProps> = ({ episode, ...rest }) => {
  const { title, content, enclosure } = episode

  return (
    <Flex justifyContent='center'>
      <Flex
        flex={1}
        direction='column'
        p={6}
        gap={4}
        borderWidth={1}
        bg='whiteAlpha.700'
        borderColor='burntOrange.500'
        borderRadius='md'
        {...rest}
      >
        <Heading size='lg'>{title}</Heading>
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
    </Flex>
  )
}

export default PodcastCard
