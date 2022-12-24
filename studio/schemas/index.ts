import { SchemaTypeDefinition } from 'sanity'

import { customNavItem } from './customNavItem'
import { episode } from './episode'
import { navigation } from './navigation'
import { page } from './page'
import { podcastEpisodes } from './podcastEpisodes'
import { publication } from './publication'
import { sectionContent, sectionWriting } from './sections'
import { sectionSelector } from './sectionSelector'
import { settings } from './settings'
import { writing } from './writing'

export const schemaTypes: SchemaTypeDefinition[] = [
  customNavItem,
  episode,
  navigation,
  page,
  podcastEpisodes,
  publication,
  settings,
  sectionContent,
  sectionWriting,
  sectionSelector,
  writing
]
