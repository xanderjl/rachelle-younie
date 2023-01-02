import { Box, Flex, FlexProps, Heading } from '@chakra-ui/react'
import { PodcastEpisode } from 'hooks/useGetPage'
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
      borderColor='burntOrange.800'
      borderRadius='xl'
      {...rest}
    >
      <Heading>{title}</Heading>
      <Player data={enclosure} />
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
    </Flex>
  )
}

export default PodcastCard
