import { SectionPodcastEpisodes } from 'hooks/useGetPage'
import { FC } from 'react'

export interface PodcastEpisodesSectionProps {
  episodes: SectionPodcastEpisodes['episodes']
}

export const PodcastEpisodesSection: FC<PodcastEpisodesSectionProps> = ({
  episodes
}) => {
  return <pre>{JSON.stringify(episodes, null, 2)}</pre>
}
