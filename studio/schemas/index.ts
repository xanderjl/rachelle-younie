import type { SchemaTypeDefinition } from 'sanity'

import { contentBlock } from './contentBlock'
import { customNavItem } from './customNavItem'
import { embed } from './embed'
import { episode } from './episode'
import { navigation } from './navigation'
import { page } from './page'
import { podcastEpisodes } from './podcastEpisodes'
import {
  sectionContent,
  sectionPodcastEpisodes,
  sectionWriting
} from './sections'
import { sectionSelector } from './sectionSelector'
import { settings } from './settings'
import { writing } from './writing'

export const schemaTypes: SchemaTypeDefinition[] = [
  contentBlock,
  customNavItem,
  embed,
  episode,
  navigation,
  page,
  podcastEpisodes,
  settings,
  sectionContent,
  sectionPodcastEpisodes,
  sectionWriting,
  sectionSelector,
  writing
]
