import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import Section from 'components/Section'
import { InferGetStaticPropsType, NextPage } from 'next'
import Parser from 'rss-parser'

const Podcast: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  feed
}) => {
  const { items, title, image, feedUrl, description } = feed
  return (
    <>
      <Section>
        <Heading>{title}</Heading>
        <Flex gap={4}>
          <Image src={image?.url} alt={title} />
          <Text>{description}</Text>
        </Flex>
      </Section>
      <pre>{JSON.stringify(feed, null, 2)}</pre>
    </>
  )
}

export const getStaticProps = async () => {
  const parser = new Parser()
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_RSS_URL)

  return {
    props: {
      feed
    }
  }
}

export default Podcast
