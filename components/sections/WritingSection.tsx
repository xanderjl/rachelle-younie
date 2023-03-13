import type { FlexProps } from '@chakra-ui/react'
import { Button, Container, Flex, Heading, Link, Text } from '@chakra-ui/react'
import type { SectionWriting } from 'hooks/data/useGetPage'
import NLink from 'next/link'
import type { FC } from 'react'

export interface WritingSectionProps extends FlexProps {
  publications: SectionWriting['publications']
}

export const WritingSection: FC<WritingSectionProps> = ({
  publications,
  ...rest
}) => {
  return (
    <Flex flexDir='column' gap={6} {...rest}>
      {publications?.map(pub => {
        const { _id, title, description, file, link, publication } = pub

        return (
          <Container
            key={_id}
            display='flex'
            flexDir='column'
            gap={4}
            maxW='75ch'
          >
            <Heading as='h2'>{title}</Heading>
            <Heading as='h3' size='md' fontFamily='body'>
              {publication}
            </Heading>
            <Text>{description}</Text>
            <Link
              as={NLink}
              href={file ?? link}
              _hover={{ textDecoration: 'none' }}
            >
              <Button colorScheme='burntOrange'>Read More</Button>
            </Link>
          </Container>
        )
      })}
    </Flex>
  )
}
