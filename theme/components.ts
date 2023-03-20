import type { ThemeComponents } from '@chakra-ui/react'

export const components: ThemeComponents = {
  Button: {},
  Heading: {
    baseStyle: {
      fontWeight: 200
    }
  },
  Link: {
    baseStyle: {
      color: 'olive.300',
      textDecor: 'underline',
      _hover: {
        color: 'olive.600'
      }
    }
  }
}
