import type { ContainerProps } from '@chakra-ui/react'
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { Section } from 'components/Section'
import NLink from 'next/link'
import type { FC } from 'react'
import type { SectionWriting } from 'types/SanityPrimitives'

export interface WritingSectionProps extends ContainerProps {
  publications: SectionWriting['publications']
}

export const WritingSection: FC<WritingSectionProps> = ({
  publications,
  ...rest
}) => {
  return (
    <Section display='flex' flexDir='column' gap={4} {...rest}>
      {publications?.map(pub => {
        const { _id, title, description, file, link, publication } = pub

        return (
          <Flex key={_id} flexDir='column' gap={4}>
            <Heading as='h2' size='lg'>
              {title}
            </Heading>
            <Heading as='h3' size='md' fontFamily='body'>
              {publication}
            </Heading>
            <Text>{description}</Text>
            <Link
              as={NLink}
              href={file ?? link}
              textDecoration='none'
              _hover={{ textDecoration: 'none' }}
            >
              <Button colorScheme='burntOrange'>Read More</Button>
            </Link>
          </Flex>
        )
      })}
    </Section>
  )
}
