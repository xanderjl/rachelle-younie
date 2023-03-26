import type { SchemaTypeDefinition } from 'sanity'

import { contentBlock } from './contentBlock'
import { customNavItem } from './customNavItem'
import { descriptiveImage } from './descriptiveImage'
import { embed } from './embed'
import { episode } from './episode'
import { imageBlock } from './imageBlock'
import {
  alignItems,
  flexDirection,
  justifyContent,
  textAlign
} from './layoutOptions'
import { navigation } from './navigation'
import { ogImage } from './ogImage'
import { page } from './page'
import { podcastEpisodes } from './podcastEpisodes'
import { poem } from './poem'
import {
  sectionContent,
  sectionHero,
  sectionPodcastEpisodes,
  sectionPoems,
  sectionWriting
} from './sections'
import { sectionSelector } from './sectionSelector'
import { settings } from './settings'
import { spacing } from './spacing'
import { writing } from './writing'

export const schemaTypes: SchemaTypeDefinition[] = [
  alignItems,
  contentBlock,
  customNavItem,
  descriptiveImage,
  embed,
  episode,
  flexDirection,
  imageBlock,
  justifyContent,
  navigation,
  ogImage,
  page,
  podcastEpisodes,
  poem,
  settings,
  sectionContent,
  sectionHero,
  sectionPodcastEpisodes,
  sectionPoems,
  sectionWriting,
  sectionSelector,
  spacing,
  textAlign,
  writing
]
