import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Heading,
  Image
} from '@chakra-ui/react'
import { PortableText } from 'components/PortableText'
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
          const { _id, title, slug, scan, copy } = poem
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
              <Accordion allowToggle>
                <AccordionItem>
                  <Heading>
                    <AccordionButton>
                      <Box as='span' flex={1} textAlign='left'>
                        {title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <PortableText value={copy} />
                    </AccordionPanel>
                  </Heading>
                </AccordionItem>
              </Accordion>
            </GridItem>
          )
        })}
      </Grid>
    </Section>
  )
}
