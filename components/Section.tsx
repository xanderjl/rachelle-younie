import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import { FC } from 'react'

const Section: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex py={12} direction='column' gap={6} {...rest}>
      {children}
    </Flex>
  )
}

export default Section
