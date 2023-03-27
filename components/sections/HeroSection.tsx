import type { BoxProps, ContainerProps, HeadingProps } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'
import { Section } from 'components/Section'
import type { FC } from 'react'
import React from 'react'
import type { Hero } from 'types/SanityPrimitives'
import { urlFor } from 'utils/urlFor'

export type HeroSectionProps = Omit<ContainerProps, 'backgroundImage'> & Hero
export type CustomMinHeight = { [key: string]: BoxProps['minH'] }
export type CustomFontSize = { [key: string]: HeadingProps['size'] }

export const HeroSection: FC<HeroSectionProps> = ({
  backgroundImage,
  backgroundColor,
  size,
  subtitle,
  title,
  color,
  ...rest
}) => {
  const bgImg = backgroundImage ? urlFor(backgroundImage).url() : ''
  const { x, y } = backgroundImage?.hotspot || {}
  const backgroundPosition = x && y ? `${x * 100}% ${y * 100}%` : 'center'
  const minH: CustomMinHeight = {
    sm: { base: '300px' },
    md: { base: '400px' },
    lg: { base: '300px', md: '500px' },
    half: '50vh',
    fullscreen: 'calc(100vh - 62px)'
  }
  const h1Size: CustomFontSize = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
    half: '3xl',
    fullscreen: { base: '2xl', md: '4xl' }
  }
  const h2Size: CustomFontSize = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
    half: 'lg',
    fullscreen: { base: 'sm', md: 'xl' }
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
      <Box w='100%' minH='inherit' backgroundColor={backgroundColor}>
        <Section
          minH='inherit'
          gap={2}
          py={8}
          px={4}
          color={color ?? 'white'}
          {...rest}
        >
          <Heading as='h1' fontFamily='accent' size={h1Size[size]}>
            {title}
          </Heading>
          {subtitle && (
            <Heading as='h2' size={h2Size[size]}>
              {subtitle}
            </Heading>
          )}
        </Section>
      </Box>
    </Box>
  )
}
