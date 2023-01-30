import type {
  FlexProps} from '@chakra-ui/react';
import {
  Box,
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'
import type { PodcastEpisode } from 'hooks/data/usePodcastData'
import { useAudio } from 'hooks/useAudio'
import type { FC} from 'react';
import { useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { MdForward30, MdReplay30 } from 'react-icons/md'
import { TbWaveSawTool } from 'react-icons/tb'
import { formatTime } from 'utils/formatTime'

export interface PlayerProps extends FlexProps {
  data: PodcastEpisode['enclosure']
}

export const Player: FC<PlayerProps> = ({ data, ...rest }) => {
  const { url } = data || {}

  const [isHovered, setHovered] = useState<boolean>(false)
  const [audioElement, audioProps] = useAudio(url as string)
  const {
    currentTime,
    setTime,
    duration,
    isPlaying,
    isSeeking,
    isLoading,
    togglePlaybackStatus
  } = audioProps

  return (
    <Flex gap={4} {...rest}>
      {audioElement}
      <Flex justifyContent='space-between' alignItems='center' gap={2}>
        <Button
          aria-label='skip back'
          as={MdReplay30}
          boxSize={8}
          variant='unstyled'
          color='burntOrange.500'
          onClick={() => currentTime && setTime(currentTime - 30)}
        />
        <Button
          aria-label='play/pause'
          as={isPlaying ? BsFillPauseFill : BsFillPlayFill}
          boxSize={12}
          p={2}
          borderRadius='full'
          colorScheme='burntOrange'
          onClick={togglePlaybackStatus}
        />
        <Button
          aria-label='skip forward'
          as={MdForward30}
          boxSize={8}
          variant='unstyled'
          color='burntOrange.500'
          onClick={() => currentTime && setTime(currentTime + 30)}
        />
      </Flex>
      <Flex flex={1} direction='column' justifyContent='center' gap={2}>
        <Slider
          aria-label='media-player'
          py={2}
          max={duration}
          colorScheme='burntOrange'
          defaultValue={0}
          value={currentTime}
          onChange={e => setTime(e)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <SliderTrack bg='burntOrange.50'>
            <SliderFilledTrack />
          </SliderTrack>
          {isHovered && (
            <SliderThumb boxSize={4}>
              <Box as={TbWaveSawTool} color='burnOrange.400' />
            </SliderThumb>
          )}
        </Slider>
        <Flex gap={0.5} fontSize='sm'>
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              <Text>
                {isSeeking
                  ? 'buffering...'
                  : currentTime
                  ? formatTime(currentTime)
                  : '00:00'}
              </Text>
              <Text>/</Text>
              <Text>{duration && formatTime(duration)}</Text>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
