import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Heading,
  Image
} from '@chakra-ui/react'
import { PortableText } from 'components/PortableText'
import { Section } from 'components/Section'
import type { SectionPoems } from 'hooks/data/useGetPage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { urlForDescriptiveImage } from 'utils/urlFor'

export interface PoemsSectionProps {
  poems: SectionPoems['poems']
}

export const PoemsSection: FC<PoemsSectionProps> = ({ poems }) => {
  const { asPath } = useRouter()

  return (
    <Section>
      <Grid
        gap={{ base: 2, md: 6 }}
        templateColumns='repeat(auto-fill, minmax(25%, 1fr))'
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
                <Image src={src} alt={title} />
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
