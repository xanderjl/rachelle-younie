import { PortableText } from '@portabletext/react'
import { Section } from 'components/Section'
import type { FC } from 'react'
import type { PortableTextBlock } from 'sanity'

import { components } from './Components'

interface ContentSectionProps {
  value: PortableTextBlock
}

export const ContentSection: FC<ContentSectionProps> = ({ value }) => {
  return (
    <Section>
      <PortableText value={value} components={components} />
    </Section>
  )
}
