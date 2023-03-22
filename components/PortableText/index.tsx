import type { PortableTextProps } from '@portabletext/react'
import { PortableText as PText } from '@portabletext/react'
import type { FC } from 'react'

import { customComponents } from './customComponents'

export const PortableText: FC<PortableTextProps> = ({
  value,
  components = customComponents,
  ...rest
}) => <PText value={value} components={components} {...rest} />
