import type { BoxProps, ContainerProps } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'
import { Section } from 'components/Section'
import type { FC } from 'react'
import React from 'react'
import type { Hero } from 'types/SanityPrimitives'
import { urlFor } from 'utils/urlFor'

export type HeroSectionProps = Omit<ContainerProps, 'backgroundImage'> & Hero
export type CustomMinHeight = { [key: string]: BoxProps['minH'] }

export const HeroSection: FC<HeroSectionProps> = ({
  backgroundImage,
  size,
  subtitle,
  title,
  ...rest
}) => {
  const bgImg = backgroundImage ? urlFor(backgroundImage).url() : ''
  const { x, y } = backgroundImage?.hotspot || {}
  const backgroundPosition = x && y ? `${x * 100}% ${y * 100}%` : 'center'
  const minH: CustomMinHeight = {
    sm: { base: '300px' },
    md: { base: '400px' },
    lg: { base: '300px', md: 'calc(100vh - 62px)' }
  }

  return (
    <Box
      position='relative'
      w='100vw'
      left='50%'
      right='50%'
      ml='-50vw'
      mr='-50vw'
      minH={minH[size]}
      backgroundImage={bgImg}
      backgroundRepeat='no-repeat'
      backgroundPosition={backgroundPosition}
      backgroundSize='cover'
    >
      <Section flexDir='column' gap={2} py={8} px={4} color='white' {...rest}>
        <Heading as='h1' size='2xl'>
          {title}
        </Heading>
        {subtitle && (
          <Heading as='h2' size='xl'>
            {subtitle}
          </Heading>
        )}
      </Section>
    </Box>
  )
}
