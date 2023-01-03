import {
  Box,
  Button,
  Flex,
  FlexProps,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react'
import { PodcastEpisode } from 'hooks/data/usePodcastData'
import { useAudio } from 'hooks/useAudio'
import { FC } from 'react'
import { AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { TbWaveSawTool } from 'react-icons/tb'
import { formatTime } from 'utils/formatTime'

export interface PlayerProps extends FlexProps {
  data: PodcastEpisode['enclosure']
}

export const Player: FC<PlayerProps> = ({ data, ...rest }) => {
  const { url } = data || {}

  const [audioElement, audioProps] = useAudio(url as string)
  const {
    currentTime,
    setTime,
    duration,
    isPlaying,
    isSeeking,
    togglePlaybackStatus
  } = audioProps

  return (
    <Flex gap={4} {...rest}>
      {audioElement}
      <Flex justifyContent='space-between' alignItems='center' gap={2}>
        <Button
          aria-label='skip back'
          as={AiOutlineStepBackward}
          boxSize={8}
          variant='unstyled'
          color='burntOrange.500'
          onClick={() => currentTime && setTime(currentTime - 15)}
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
          as={AiOutlineStepForward}
          boxSize={8}
          variant='unstyled'
          color='burntOrange.500'
          onClick={() => currentTime && setTime(currentTime + 30)}
        />
      </Flex>
      <Flex flex={1} direction='column'>
        <Slider
          aria-label='media-player'
          max={duration}
          colorScheme='burntOrange'
          defaultValue={0}
          value={currentTime}
          onChange={e => setTime(e)}
        >
          <SliderTrack bg='burntOrange.50'>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box as={TbWaveSawTool} color='burnOrange.400' />
          </SliderThumb>
        </Slider>
        <Flex justifyContent='space-between' fontSize='sm'>
          <Text>
            {isSeeking
              ? 'buffering...'
              : currentTime && formatTime(currentTime)}
          </Text>
          <Text>{duration && formatTime(duration)}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
