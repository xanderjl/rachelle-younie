import type { FlexProps } from '@chakra-ui/react'
import { Flex, Heading, Link, Text } from '@chakra-ui/react'
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
          <Flex key={_id} flexDir='column'>
            <Heading as='h2'>{title}</Heading>
            <Text>{description}</Text>
            <Link as={NLink} href={file ?? link}>
              Read
            </Link>
            <pre>{JSON.stringify(publication, null, 2)}</pre>
          </Flex>
        )
      })}
    </Flex>
  )
}
