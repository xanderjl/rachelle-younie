import type { BoxProps, TextareaProps } from '@chakra-ui/react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea
} from '@chakra-ui/react'
import { useForm, ValidationError } from '@formspree/react'
import { Section } from 'components/Section'
import type { GetStaticProps, NextPage } from 'next'
import type { FC } from 'react'

const ContactPage: FC<NextPage> = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY)

  const sharedStyles: BoxProps = {
    bgColor: 'cream.50',
    borderColor: 'cream.900',
    _hover: {
      borderColor: 'cream.700'
    }
  }

  return (
    <Section>
      {state.succeeded ? (
        <Heading textAlign='center'>
          Thank you for your message! I&apos;ll get back to you as soon as I
          can.
        </Heading>
      ) : (
        <>
          <Heading>Get In Touch</Heading>
          <Flex
            as='form'
            display='flex'
            flexDirection='column'
            gap={6}
            onSubmit={handleSubmit}
          >
            <FormControl isRequired>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input type='email' name='email' {...sharedStyles} />
              <ValidationError
                prefix='Email'
                field='email'
                errors={state.errors}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='name'>Full Name</FormLabel>
              <Input name='name' {...sharedStyles} />
              <ValidationError
                prefix='Name'
                field='name'
                errors={state.errors}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor='message'>Full Name</FormLabel>
              <Textarea
                name='message'
                rows={10}
                {...(sharedStyles as TextareaProps)}
              />
              <ValidationError
                prefix='Message'
                field='message'
                errors={state.errors}
              />
            </FormControl>
            <FormControl>
              <Button
                type='submit'
                loadingText='Submitting...'
                isLoading={state.submitting}
                leftIcon={state.submitting ? <Spinner /> : undefined}
                colorScheme='green'
              >
                Submit
              </Button>
            </FormControl>
          </Flex>
        </>
      )}
    </Section>
  )
}
export default ContactPage

export const getStaticProps: GetStaticProps = () => ({ props: {} })
