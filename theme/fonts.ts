import type { Theme } from '@chakra-ui/react'

export const fonts: Partial<Theme['fonts'] & { accent: string }> = {
  heading: 'DM Serif Display, sans serif',
  body: 'Nanum Myeongjo, serif',
  accent: 'Sacramento, sans serif'
}
