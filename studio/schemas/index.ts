import type { SchemaTypeDefinition } from 'sanity'

import { contentBlock } from './contentBlock'
import { customNavItem } from './customNavItem'
import { descriptiveImage } from './descriptiveImage'
import { embed } from './embed'
import { episode } from './episode'
import { imageBlock } from './imageBlock'
import { navigation } from './navigation'
import { page } from './page'
import { podcastEpisodes } from './podcastEpisodes'
import {
  sectionContent,
  sectionHero,
  sectionPodcastEpisodes,
  sectionWriting
} from './sections'
import { sectionSelector } from './sectionSelector'
import { settings } from './settings'
import { writing } from './writing'

export const schemaTypes: SchemaTypeDefinition[] = [
  contentBlock,
  customNavItem,
  descriptiveImage,
  embed,
  episode,
  imageBlock,
  navigation,
  page,
  podcastEpisodes,
  settings,
  sectionContent,
  sectionHero,
  sectionPodcastEpisodes,
  sectionWriting,
  sectionSelector,
  writing
]
