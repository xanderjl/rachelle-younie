import { SectionWriting } from 'hooks/data/useGetPage'
import { FC } from 'react'
export interface WritingSectionProps {
  publications: SectionWriting['publications']
}

export const WritingSection: FC<WritingSectionProps> = ({ publications }) => {
  return <pre>{JSON.stringify(publications, null, 2)}</pre>
}
