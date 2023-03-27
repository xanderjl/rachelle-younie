import { AspectRatio, Grid, GridItem, Heading, Image } from '@chakra-ui/react'
import { Section } from 'components/Section'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import type { SectionPoems } from 'types/SanityPrimitives'
import { urlForDescriptiveImage } from 'utils/urlFor'

export interface PoemsSectionProps {
  poems: SectionPoems['poems']
}

export const PoemsSection: FC<PoemsSectionProps> = ({ poems }) => {
  const { asPath } = useRouter()

  return (
    <Section>
      <Grid
        gap={{ base: 6, sm: 8 }}
        templateColumns={`repeat(auto-fill, minmax(212px, 1fr))`}
      >
        {poems?.map(poem => {
          const { _id, title, slug, scan } = poem
          const src =
            scan.image &&
            urlForDescriptiveImage(scan.image, scan.maxWidth).url()

          return (
            <GridItem key={_id}>
              <Heading>{title}</Heading>
              <Link href={`${asPath}/${slug}`}>
                <AspectRatio ratio={2 / 3}>
                  <Image
                    src={src}
                    alt={scan.altText ?? `image of the poem: ${title}`}
                    objectFit='cover'
                  />
                </AspectRatio>
              </Link>
            </GridItem>
          )
        })}
      </Grid>
    </Section>
  )
}
