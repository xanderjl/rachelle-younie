import { Heading, Spinner, Stack, TextArea, TextInput } from '@sanity/ui'
import { FC } from 'react'
import { ObjectInputProps } from 'sanity'
import { usePodcastData } from 'studio/hooks'

export interface EpisodeProps {
  title: string
  content: string
  contentSnippet: string
  creator: string
  enclosure: {
    url: string
    length: string
    type: string
  }
  guid: string
  isoDate: string
  pubDate: string
  link: string
}

export type EpisodeInputProps = ObjectInputProps<EpisodeProps>

export const PodcastEpisode: FC<EpisodeInputProps> = props => {
  // const { data, isLoading } = usePodcastData()
  // const { items } = data || {}
  // const { title, creator, contentSnippet, guid, pubDate, isoDate, link } =
  //   items?.[0] || {}
  console.log({ props })

  return (
    <Stack space={5}>
      {/* {props.renderDefault(props)} */}
      {/* <Stack space={2}>
        <Heading size={0}>Title</Heading>
        <TextInput defaultValue={title} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>Creator</Heading>
        <TextInput defaultValue={creator} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>Publish Date</Heading>
        <TextInput defaultValue={pubDate} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>ISO Date</Heading>
        <TextInput defaultValue={isoDate} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>Link</Heading>
        <TextInput rows={10} defaultValue={link} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>GUID</Heading>
        <TextInput rows={10} defaultValue={guid} />
      </Stack>
      <Stack space={2}>
        <Heading size={0}>Content Snippet</Heading>
        <TextArea rows={10} defaultValue={contentSnippet} />
      </Stack> */}
    </Stack>
  )
}
