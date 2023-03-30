import type { ContainerProps } from '@chakra-ui/react'
import { Container, Flex, Image, Text } from '@chakra-ui/react'
import { useInitialData } from 'hooks/data/useInitialData'
import Link from 'next/link'
import type { FC } from 'react'
import { urlFor } from 'utils/urlFor'

export const Footer: FC<ContainerProps> = props => {
  const { data } = useInitialData()
  const { navigation, socials } = data || {}
  const year = new Date().getFullYear()

  return (
    <Container
      as='footer'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      maxW='container.lg'
      py={3}
      {...props}
    >
      <Flex direction='column'>
        {navigation?.map(({ slug, title }) => (
          <Link key={slug} href={`/${slug}`}>
            {title}
          </Link>
        ))}
      </Flex>
      <Flex>
        {socials?.map(({ _id, icon, title, url }) => {
          const src = urlFor(icon).url()
          return (
            <a key={_id} href={url}>
              <Image src={src} alt={title} boxSize={8} />
            </a>
          )
        })}
      </Flex>
      <Text as='span'>&copy; Copyright {year}, Rachelle Younie</Text>
    </Container>
  )
}
