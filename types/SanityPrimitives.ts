import type { Image, PortableTextBlock } from 'sanity'

export type Ratio = '16:9' | '4:3' | '1:1'
export type Spacing =
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export type AlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'

export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export interface Embed {
  url: string
  aspectRatio: Ratio
}

export interface DescriptiveImage {
  image?: Image
  altText?: string
  maxWidth?: number
}

export interface ImageBlock {
  image: Required<DescriptiveImage>
  imageAlignment: 'left' | 'right'
  content: PortableTextBlock | PortableTextBlock[]
  gap: Spacing
}

export interface Publication {
  _id: string
  description?: string
  link?: string
  file?: string
  publication: string
  title: string
}

export interface PodcastEpisode {
  _key: string
  content?: string
  creator?: string
  enclosure?: {
    length?: string
    type?: string
    url?: string
  }
  guid?: string
  isoDate?: string
  title?: string
}

export interface Hero {
  title: string
  subtitle?: string
  color?: string
  backgroundImage?: Image
  size: 'sm' | 'md' | 'lg' | 'half' | 'fullscreen'
  textAlign: TextAlign
  flexDirection: FlexDirection
  justifyContent: JustifyContent
  alignItems: AlignItems
}

export interface Poem {
  _id: string
  title: string
  slug: string
  scan: DescriptiveImage
  copy: PortableTextBlock[]
}

export interface BaseSection {
  _key: string
  _type:
    | 'sectionContent'
    | 'sectionHero'
    | 'sectionPodcastEpisodes'
    | 'sectionPoems'
    | 'sectionWriting'
}

export interface SectionContent extends BaseSection {
  content: PortableTextBlock
}

export interface SectionWriting extends BaseSection {
  publications?: Publication[]
}

export interface SectionPodcastEpisodes extends BaseSection {
  episodes?: PodcastEpisode[]
}

export interface SectionPoems extends BaseSection {
  poems?: Poem[]
}

export type SectionHero = BaseSection & Hero

export type Section =
  | SectionContent
  | SectionWriting
  | SectionPodcastEpisodes
  | SectionPoems
  | SectionHero
