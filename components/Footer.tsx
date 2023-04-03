import type { ContainerProps } from '@chakra-ui/react'
import { Container, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useInitialData } from 'hooks/data/useInitialData'
import NLink from 'next/link'
import type { FC } from 'react'
import { urlFor } from 'utils/urlFor'

import { linkStyles } from './Navbar/linkStyles'

export const Footer: FC<ContainerProps> = props => {
  const { data } = useInitialData()
  const { navigation, socials } = data || {}
  const year = new Date().getFullYear()
  const gap = 2

  return (
    <Container
      as='footer'
      display='flex'
      flexDirection='column'
      alignItems='center'
      maxW='container.lg'
      py={{ base: 4, md: 8 }}
      gap={gap + 4}
      {...props}
    >
      <Flex gap={gap} flexWrap='wrap' pb={2}>
        {navigation?.map(({ slug, title }) => (
          <Link as={NLink} key={slug} href={`/${slug}`} {...linkStyles}>
            {title}
          </Link>
        ))}
      </Flex>
      <Flex flexDirection='column' align='center' gap={gap}>
        <Text as='span' fontSize='sm'>
          &copy; Copyright {year}, Rachelle Younie
        </Text>
        <Flex gap={gap}>
          {socials?.map(({ _id, icon, title, url }) => {
            const src = urlFor(icon).width(80).url()

            return (
              <Link
                key={_id}
                href={url}
                filter='brightness(0) saturate(100%) invert(26%) sepia(47%) saturate(819%) hue-rotate(332deg) brightness(95%) contrast(87%)'
                _hover={{
                  filter:
                    'brightness(0) saturate(100%) invert(30%) sepia(30%) saturate(1126%) hue-rotate(10deg) brightness(99%) contrast(89%)'
                }}
              >
                <Image
                  src={src}
                  alt={title}
                  boxSize={8}
                  objectFit='contain'
                  objectPosition='center'
                />
              </Link>
            )
          })}
        </Flex>
      </Flex>
    </Container>
  )
}
