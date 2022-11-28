import { page } from './page'
import { settings } from './settings'
import { sectionContent } from './sections'
import { sectionSelector } from './sectionSelector'
import { navigation } from './navigation'
import { podcastEpisodes } from './podcastEpisodes'

export const schemaTypes = [
  navigation,
  page,
  podcastEpisodes,
  settings,
  sectionContent,
  sectionSelector
]
