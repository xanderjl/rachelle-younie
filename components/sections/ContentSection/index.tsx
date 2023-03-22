import { PortableText } from 'components/PortableText'
import { Section } from 'components/Section'
import type { FC } from 'react'
import type { PortableTextBlock } from 'sanity'

interface ContentSectionProps {
  value: PortableTextBlock
}

export const ContentSection: FC<ContentSectionProps> = ({ value }) => {
  return (
    <Section>
      <PortableText value={value} />
    </Section>
  )
}
