import type { FlexProps } from '@chakra-ui/react'
import { Flex, Heading } from '@chakra-ui/react'
import type { Hero } from 'hooks/data/useGetPage'
import type { FC } from 'react'
import React from 'react'
import { urlFor } from 'utils/urlFor'

export type HeroSectionProps = Omit<FlexProps, 'backgroundImage'> & Hero

export const HeroSection: FC<HeroSectionProps> = ({
  backgroundImage,
  size,
  subtitle,
  title,
  ...rest
}) => {
  const bgImg = backgroundImage ? urlFor(backgroundImage).url() : ''
  const minH = {
    sm: { base: '300px' },
    md: { base: '400px' },
    lg: { base: '300px', md: '500px' }
  }

  return (
    <Flex
      flexDir='column'
      gap={2}
      py={8}
      px={4}
      color='white'
      backgroundImage={bgImg}
      backgroundRepeat='no-repeat'
      backgroundPosition='center'
      minH={minH[size]}
      {...rest}
    >
      <Heading as='h1' size='2xl'>
        {title}
      </Heading>
      {subtitle && (
        <Heading as='h2' size='xl'>
          {subtitle}
        </Heading>
      )}
    </Flex>
  )
}
