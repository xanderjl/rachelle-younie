import type { MutableRefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

type UseAudio = [
  JSX.Element,
  {
    audioRef: MutableRefObject<HTMLAudioElement | null>
    currentTime?: number
    duration?: number
    isPlaying: boolean
    isSeeking: boolean
    isLoading: boolean
    progress?: number
    setTime: (seconds: number) => void
    togglePlaybackStatus: () => void
  }
]

export const useAudio = (url: string): UseAudio => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [currentTime, setCurrentTime] = useState<number | undefined>(0)
  const [duration, setDuration] = useState<number | undefined>(undefined)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isSeeking, setSeeking] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
  }, [url])

  return [
    <audio
      hidden
      key={url}
      src={url}
      ref={audioRef}
      onLoadedData={() => {
        setPlaying(false)
        setLoading(false)
        setDuration(audioRef?.current?.duration)
      }}
      onSeeking={() => setSeeking(true)}
      onSeeked={() => setSeeking(false)}
      onTimeUpdate={() => setCurrentTime(audioRef?.current?.currentTime)}
    />,
    {
      audioRef,
      currentTime,
      duration,
      isPlaying,
      isSeeking,
      isLoading,
      progress: currentTime && duration && (currentTime / duration) * 100,
      setTime: (seconds: number) => {
        if (audioRef?.current) {
          audioRef.current.currentTime = seconds
        }
      },
      togglePlaybackStatus: () => {
        if (isPlaying) {
          audioRef?.current?.pause()
          setPlaying(false)
        } else {
          audioRef?.current?.play()
          setPlaying(true)
        }
      }
    }
  ]
}
