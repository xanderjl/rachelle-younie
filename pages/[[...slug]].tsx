import { Heading, Text } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { getPages } from 'hooks/useGetPages'
import { GetStaticPaths, NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <>
      <Heading>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Heading>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
        recusandae dolore obcaecati vel, facilis necessitatibus facere
        laudantium hic! Recusandae vel nesciunt aliquid. Dicta quaerat
        laudantium dignissimos, explicabo mollitia minus corrupti ab nulla ipsam
        itaque fugit laborum temporibus incidunt placeat illo facere tenetur
        doloribus sed, ducimus consectetur? Reiciendis et aspernatur vero eum
        laboriosam voluptatum aperiam, perspiciatis ipsa voluptas nihil
        inventore dolore?
      </Text>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ctx => {
  const client = new QueryClient()
  const slugs = await client.prefetchQuery({
    queryKey: ['pages'],
    queryFn: getPages
  })

  const paths = slugs.map(({ slug }) => {
    return { params: { slug } }
  })

  return {
    paths: { params },
    fallback: false
  }
}

export default Page
