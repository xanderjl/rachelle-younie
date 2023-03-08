import type { BoxProps } from '@chakra-ui/react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Link,
  ListItem,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react'
import { useInitialData } from 'hooks/data/useInitialData'
import NLink from 'next/link'
import type { FC } from 'react'
import { useRef } from 'react'
import { FiMenu } from 'react-icons/fi'

export const Mobile: FC<BoxProps> = props => {
  const { data } = useInitialData()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLButtonElement>(null)

  const { navigation } = data || {}

  return (
    <Box
      display={{ base: 'flex', md: 'none' }}
      justifyContent='space-between'
      alignItems='center'
      py={2}
      {...props}
    >
      <Link as={NLink} href='/'>
        Rachelle Younie
      </Link>
      <Button as={FiMenu} variant='unstyled' boxSize={8} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={ref}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent fontSize='xl'>
          <DrawerCloseButton variant='unstyled' />
          <DrawerBody>
            <UnorderedList
              display='flex'
              flexDir='column'
              gap={4}
              py={4}
              listStyleType='none'
            >
              {navigation?.map(({ slug, title }, i) => (
                <ListItem key={i}>
                  <Link as={NLink} href={slug}>
                    {title}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
