import { Flex, Image, Link } from '@chakra-ui/react'
import { Section } from 'components/Section'
import type { FC } from 'react'
import type { SectionSocials } from 'types/SanityPrimitives'
import { urlFor } from 'utils/urlFor'

export interface SocialsSectionProps {
  socials: SectionSocials['socials']
}

export const SocialsSection: FC<SocialsSectionProps> = ({ socials }) => {
  return (
    <Section>
      <Flex gap={2}>
        {socials.map(social => {
          const { _id, icon, title, url } = social
          const src = urlFor(icon).url()

          return (
            <Link key={_id} href={url}>
              <Image src={src} alt={title} boxSize={8} />
            </Link>
          )
        })}
      </Flex>
    </Section>
  )
}
