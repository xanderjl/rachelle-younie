import {
  Box,
  Button,
  Flex,
  FlexProps,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react'
import { PodcastEpisode } from 'hooks/usePodcastData'
import { FC, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'

export interface PlayerProps extends FlexProps {
  data: PodcastEpisode['enclosure']
}

export const Player: FC<PlayerProps> = ({ data, ...rest }) => {
  const [isPlaying, setPlaying] = useState<boolean>(false)

  const { length, type, url } = data || {}
  const runtime = parseInt(length ?? '0')
  const buttonIcon = isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />

  return (
    <Flex gap={4} {...rest}>
      <audio src={url} style={{ flex: 1 }} />
      <Button
        onClick={() => setPlaying(!isPlaying)}
        // borderRadius='full'
        colorScheme='burntOrange'
      >
        {buttonIcon}
      </Button>
      <Slider
        aria-label='media-player'
        defaultValue={0}
        max={runtime}
        colorScheme='burntOrange'
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  )
}
